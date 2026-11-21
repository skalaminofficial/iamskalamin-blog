import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const src = 'node_modules/decap-cms/dist/decap-cms.js';
const dest = 'public/admin/decap-cms.js';

if (!existsSync(src)) {
  console.error('decap-cms is not installed. Run: npm install');
  process.exit(1);
}

mkdirSync('public/admin', { recursive: true });
copyFileSync(src, dest);
console.log('Copied Decap CMS to', dest);
