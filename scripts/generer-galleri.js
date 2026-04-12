const fs = require('fs');
const path = require('path');

const galleriDir = path.join(__dirname, '..', '_galleri');
const utFil = path.join(galleriDir, 'index.json');

if (!fs.existsSync(galleriDir)) {
  console.log('Ingen _galleri-mappe funnet, hopper over.');
  process.exit(0);
}

const filer = fs.readdirSync(galleriDir).filter(f => f.endsWith('.md'));

const malerier = filer.map(f => {
  try {
    const innhold = fs.readFileSync(path.join(galleriDir, f), 'utf8');
    // Parse YAML frontmatter mellom --- og ---
    const match = innhold.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    const yaml = match[1];
    const obj = {};
    yaml.split('\n').forEach(linje => {
      const kolon = linje.indexOf(':');
      if (kolon === -1) return;
      const nokkel = linje.slice(0, kolon).trim();
      let verdi = linje.slice(kolon + 1).trim();
      // Fjern anførselstegn
      if (verdi.startsWith('"') && verdi.endsWith('"')) verdi = verdi.slice(1, -1);
      if (verdi === 'true') verdi = true;
      else if (verdi === 'false') verdi = false;
      else if (!isNaN(verdi) && verdi !== '') verdi = Number(verdi);
      obj[nokkel] = verdi;
    });
    return obj;
  } catch (e) {
    console.error('Feil ved lesing av', f, e.message);
    return null;
  }
}).filter(Boolean);

malerier.sort((a, b) => (a.nummer || 0) - (b.nummer || 0));

fs.writeFileSync(utFil, JSON.stringify(malerier, null, 2));
console.log(`Genererte _galleri/index.json med ${malerier.length} malerier.`);
