import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { BackupUtil } from '@node-mongo-backup-restore/common';
import { Logger } from '@node-mongo-backup-restore/common';
import { appConfig } from './config';

const execPromise = util.promisify(exec);

const main = async () => {
  const ts = Date.now();
  const logFilePath = BackupUtil.getBackupLogPath(appConfig.appPrefixTag, ts, appConfig.logDir);

  try {
    await backupMainCollections(ts, logFilePath);
  } catch (error: any) {
    Logger.writeLogFile({ message: error.message, logFile: logFilePath });
  }

  Logger.writeLogFile({ message: 'Backup service completed', logFile: logFilePath });
}


const backupMainCollections = (ts: number, logFilePath: string, excludeCollectionsPrefix?: string) => {
  const backupPrefixName = `${appConfig.appPrefixTag}_main`;
  const backupFileName = `${backupPrefixName}_${ts}.gz`;
  const backupPath = path.join(path.resolve(appConfig.backupDir), backupFileName);

  return new Promise((resolve, reject) => {
    let command = `${BackupUtil.getMongodumpCommand(appConfig.mongoUri)} --archive="${backupPath}"`;
    if (excludeCollectionsPrefix) {
      command = command.concat(` --excludeCollectionsWithPrefix="${excludeCollectionsPrefix}"`);
    }
    Logger.writeLogFile({ message: `Backup main collections started: ${backupFileName}`, logFile: logFilePath });

    const backupProcess = exec(command);

    if (backupProcess.stdout) {
      // Listen for data on stdout (to capture progress)
      backupProcess.stdout.on('data', (data) => {
        const output = data.toString();
        // Look for lines that contain progress or info about the process
        if (output.includes("bytes written") || output.includes("records copied")) {
          Logger.writeLogFile({ message: output.trim(), logFile: logFilePath });
        }
      });
    }

    // Listen for errors on stderr
    if (backupProcess.stderr) {
      backupProcess.stderr.on('data', (data) => {
        Logger.writeLogFile({ message: data.toString().trim(), logFile: logFilePath });
      });
    }

    backupProcess.on('close', (code) => {
      if (code === 0) {
        Logger.writeLogFile({ message: `Backup main collections completed: ${backupFileName}`, logFile: logFilePath });
        resolve(backupPath);
      } else {
        const errorMessage = `Backup main collections failed: ${backupFileName}`;
        Logger.writeLogFile({ message: errorMessage, logFile: logFilePath });
        reject(new Error(errorMessage));
      }
    });
  });
}