// Zapis wyników i planu. Dwa tryby z tym samym interfejsem:
//  - chmura (Firebase: logowanie Google albo e-mail i hasło + Firestore) – dane na każdym urządzeniu po zalogowaniu,
//  - lokalny – gdy firebase-config.js zawiera null; dane tylko w tej przeglądarce (localStorage).
//
// Model danych w Firestore (każdy widzi tylko swoje dane, patrz firestore.rules):
//   users/{uid}  { profile: {przedmiot: {pp, pr}}, targets: [id oferty], quiz: {odpowiedzi testu}, email, name, updatedAt }
/* global FIREBASE_CONFIG */

const FB = 'https://www.gstatic.com/firebasejs/10.12.2';

function isCloudConfigured() {
  return typeof FIREBASE_CONFIG !== 'undefined' && !!(FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);
}

async function createStore() {
  if (!isCloudConfigured()) return {mode: 'local'};
  try {
    return await createCloudStore();
  } catch (e) {
    // Brak internetu przy pierwszym uruchomieniu albo zablokowane skrypty: aplikacja działa dalej lokalnie.
    console.warn('Firebase niedostępny, tryb lokalny', e);
    return {mode: 'local', error: e};
  }
}

async function createCloudStore() {
  const [{initializeApp}, auth, fs] = await Promise.all([
    import(`${FB}/firebase-app.js`),
    import(`${FB}/firebase-auth.js`),
    import(`${FB}/firebase-firestore.js`),
  ]);
  const app = initializeApp(FIREBASE_CONFIG);
  const a = auth.getAuth(app);
  a.languageCode = 'pl';
  let db;
  try {
    // Dane zostają na telefonie: aplikacja działa bez internetu, zmiany wysyłają się po odzyskaniu sieci.
    db = fs.initializeFirestore(app, {localCache: fs.persistentLocalCache({tabManager: fs.persistentMultipleTabManager()})});
  } catch (e) {
    db = fs.getFirestore(app);
  }
  auth.getRedirectResult(a).catch(() => {});

  const norm = (e) => (e || '').trim().toLowerCase();
  const toUser = (u) => ({uid: u.uid, name: u.displayName || u.email, email: norm(u.email), photo: u.photoURL, emailVerified: u.emailVerified});
  const back = () => location.href.split('#')[0];
  const userDoc = (uid) => fs.doc(db, 'users', uid);
  let quizBlocked = false;

  return {
    mode: 'cloud',
    onAuth(cb) {return auth.onAuthStateChanged(a, (u) => cb(u ? toUser(u) : null));},
    async signIn() {
      const provider = new auth.GoogleAuthProvider();
      provider.setCustomParameters({prompt: 'select_account'});
      try {
        await auth.signInWithPopup(a, provider);
      } catch (e) {
        // Niektóre telefony blokują okienka – wtedy logowanie przez przekierowanie.
        if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/cancelled-popup-request'].includes(e.code)) {
          await auth.signInWithRedirect(a, provider);
        } else if (e.code !== 'auth/popup-closed-by-user') {
          throw e;
        }
      }
    },
    async signInEmail(email, password) {await auth.signInWithEmailAndPassword(a, norm(email), password);},
    async signUpEmail(email, password, name) {
      const cred = await auth.createUserWithEmailAndPassword(a, norm(email), password);
      if (name) await auth.updateProfile(cred.user, {displayName: name});
      await auth.sendEmailVerification(cred.user, {url: back()});
    },
    async resetPassword(email) {await auth.sendPasswordResetEmail(a, norm(email), {url: back()});},
    async resendVerification() {await auth.sendEmailVerification(a.currentUser, {url: back()});},
    /** Po kliknięciu linku w mailu: odśwież konto i token (reguły sprawdzają email_verified). */
    async refreshUser() {
      if (!a.currentUser) return null;
      await auth.reload(a.currentUser);
      if (a.currentUser.emailVerified) await a.currentUser.getIdToken(true);
      return toUser(a.currentUser);
    },
    async signOut() {await auth.signOut(a);},
    /** Dane użytkownika albo null, gdy jeszcze nic nie zapisał. */
    async load(uid) {
      const snap = await fs.getDoc(userDoc(uid));
      return snap.exists() ? snap.data() : null;
    },
    async save(user, data) {
      const doc = {profile: data.profile, targets: data.targets, email: user.email, name: user.name || '', updatedAt: fs.serverTimestamp()};
      if (data.quiz && !quizBlocked) doc.quiz = data.quiz;
      try {
        await fs.setDoc(userDoc(user.uid), doc);
      } catch (e) {
        // Stare reguły bez pola quiz odrzucają cały zapis – zapisz wtedy wyniki i plan bez odpowiedzi testu.
        if (e.code !== 'permission-denied' || !doc.quiz) throw e;
        quizBlocked = true; delete doc.quiz;
        await fs.setDoc(userDoc(user.uid), doc);
      }
    },
    /** false, gdy reguły w Firebase nie pozwalają jeszcze zapisać odpowiedzi testu. */
    quizSynced() {return !quizBlocked;},
    /** Zmiany z innych urządzeń. Pomija echo własnych, jeszcze niewysłanych zapisów. */
    watch(uid, cb) {
      return fs.onSnapshot(userDoc(uid), (snap) => {
        if (snap.exists() && !snap.metadata.hasPendingWrites) cb(snap.data());
      }, () => {});
    },
    async deleteData(uid) {await fs.deleteDoc(userDoc(uid));},
  };
}
