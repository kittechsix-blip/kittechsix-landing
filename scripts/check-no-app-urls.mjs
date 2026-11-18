// Build gate: while apps are in preview, no app address may ship in the site.
// Scans dist/ for the hosts the apps live on. Released apps use App Store links
// (data/release.ts), which this does not block.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const banned = [
  /kittechsix-blip\.github\.io\/mymedkitt/i,
  /my-vertigo-app\.vercel\.app/i, /mystroke-kitt\.vercel\.app/i, /obgyn-kitt\.vercel\.app/i,
  /electrokitt\.vercel\.app/i, /acidbase\.vercel\.app/i, /burn-kitt\.vercel\.app/i,
  /powerkitt\.vercel\.app/i, /endocrinekitt\.vercel\.app/i, /echokitt[a-z0-9-]*\.vercel\.app/i,
  /kittech-six\.org\/echo-course/i,
];
const hits = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(js|html|json|css|txt|xml|webmanifest)$/.test(name)) continue;
    const text = readFileSync(p, 'utf8');
    for (const re of banned) if (re.test(text)) hits.push(`${p}: ${re.source}`);
  }
};
walk('dist');
if (hits.length) { console.error('App address found in the built site (apps are in preview):\n' + hits.join('\n')); process.exit(1); }
console.log('no app addresses in dist ✓');
