import path from 'path';

export class BackupUtil {

  static getMongodumpCommand(uri: string) {
    return `mongodump --uri="${uri}" --gzip -v`;
  }

  static getBackupFileName(prefix: string, ts: number) {
    return `${prefix}_${ts}.gz`;
  }

  static getBackupLogPath(prefix: string, ts: number, logDir: string) {
    const backupFileName = this.getBackupFileName(prefix, ts);
    const logPath = path.join(
      path.resolve(logDir),
      backupFileName.replace('.gz', '.log')
    );

    return logPath;
  }

  static async backupDatabase() {
    // Backup database logic here
    console.log('Database backup successfully');
  }
}