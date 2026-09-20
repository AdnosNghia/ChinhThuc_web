import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const source = path.resolve('chinhthuc.sqlite');
const temp = path.resolve('backups', 'restore-verification.sqlite');
fs.mkdirSync(path.dirname(temp), { recursive: true });
if (fs.existsSync(temp)) fs.unlinkSync(temp);
const sourceDb = new Database(source, { readonly: true });
await sourceDb.backup(temp);
sourceDb.close();
const restored = new Database(temp, { readonly: true });
const tables = restored.prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type='table'").get().count;
const products = restored.prepare('SELECT COUNT(*) AS count FROM products').get().count;
const leads = restored.prepare('SELECT COUNT(*) AS count FROM quote_requests').get().count;
restored.close();
fs.unlinkSync(temp);
if (tables < 5) throw new Error('Restore verification failed: missing tables');
console.log(`PASS: backup restore tables=${tables} products=${products} leads=${leads}`);
