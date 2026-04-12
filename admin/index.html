const fs = require('fs');
const path = require('path');

const galleriDir = path.join(__dirname, '..', '_galleri');
const utDir = path.join(__dirname, '..', '_galleri');

if (!fs.existsSync(galleriDir)) {
  console.log('Ingen _galleri-mappe funnet, hopper over.');
  process.exit(0);
}

const filer = fs.readdirSync(galleriDir).filter(f => f.endsWith('.json') && f !== 'index.json');
const malerier = filer.map(f => {
  try {
    return JSON.parse(fs.readFileSync(path.join(galleriDir, f), 'utf8'));
  } catch (e) {
    return null;
  }
}).filter(Boolean);

malerier.sort((a, b) => (a.nummer || 0) - (b.nummer || 0));

fs.writeFileSync(path.join(utDir, 'index.json'), JSON.stringify(malerier, null, 2));
console.log(`Genererte _galleri/index.json med ${malerier.length} malerier.`);
