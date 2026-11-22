// Ładuje skrypty aplikacji (zwykłe pliki przeglądarkowe) do jednego kontekstu, jak w przeglądarce.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
module.exports = function load() {
  const ctx = vm.createContext({console});
  for (const f of ['data.js', 'architektura.js', 'wnetrza.js', 'calc.js']) {
    const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'js', f), 'utf8').replace(/^if \(typeof module.*$/m, '');
    vm.runInContext(src, ctx, {filename: f});
  }
  return vm.runInContext('({ARCH, AW, OFFERS, OMAP, compute, archCompute, archMax, status, gains, K, U})', ctx);
};
