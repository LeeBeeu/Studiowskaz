// Składa aplikację w jeden plik HTML (bez service workera) do publikacji jako Artifact.
const fs = require('fs');
const path = require('path');
const app = path.join(__dirname, '..', 'app');
const read = f => fs.readFileSync(path.join(app, f), 'utf8');
const html = read('index.html');
const body = html.slice(html.indexOf('<body>') + 6, html.indexOf('<script src="js/data.js">'));
const js = ['data.js', 'architektura.js', 'calc.js', 'app.js'].map(f => read('js/' + f)).join('\n');
const out = `<title>Studiowskaz</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap">
<style>
${read('css/styles.css')}
</style>
${body.replace(/<\/body>[\s\S]*$/, '')}
<script>
${js}
</script>
`;
fs.writeFileSync(path.join(__dirname, '..', 'app.html'), out);
console.log('app.html:', out.length, 'znaków');
