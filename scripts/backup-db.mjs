import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const source = path.resolve('chinhthuc.sqlite');
const targetDir = path.resolve(process.env.BACKUP_DIR || 'backups');
fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(source)) throw new Error(`Database not found: ${source}`);
const target = path.join(targetDir, `chinhthuc-${new Date().toISOString().replace(/[:.]/g, '-')}.sqlite`);
const db = new Database(source, { readonly: true });
await db.backup(target);
db.close();
console.log(`Backup created: ${target}`);
