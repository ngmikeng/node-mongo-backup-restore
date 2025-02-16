const appPrefixTag = 'backup_service';
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const backupDir = process.env.BACKUP_DIR || './backup-data';
const logDir = process.env.LOG_DIR || './backup-logs';

export const appConfig = {
  mongoUri,
  backupDir,
  logDir,
  appPrefixTag,
}