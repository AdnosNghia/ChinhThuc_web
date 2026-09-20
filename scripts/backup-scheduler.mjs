import { spawn } from 'node:child_process';

const intervalMs = Number(process.env.BACKUP_INTERVAL_MS || 24 * 60 * 60 * 1000);
const run = script => new Promise(resolve => {
  const child = spawn(process.execPath, [script], { stdio: 'inherit', env: process.env });
  child.on('exit', code => resolve(code || 0));
});
const runBackup = async () => {
  const backupCode = await run('scripts/backup-db.mjs');
  if (backupCode !== 0) {
    console.error(`Scheduled backup failed with code ${backupCode}`);
    return;
  }
  const verifyCode = await run('scripts/verify-backup.mjs');
  if (verifyCode !== 0) console.error(`Scheduled backup verification failed with code ${verifyCode}`);
  else console.log(`Scheduled backup and restore verification PASS at ${new Date().toISOString()}`);
};
console.log(`Backup scheduler started; interval=${intervalMs}ms (production default: daily)`);
await runBackup();
if (process.env.BACKUP_RUN_ONCE === 'true') process.exit(0);
setInterval(runBackup, intervalMs);
