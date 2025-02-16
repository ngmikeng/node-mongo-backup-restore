import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { BackupUtil } from '@node-mongo-backup-restore/common';
import { Logger } from '@node-mongo-backup-restore/common';
import { appConfig } from './config';

const execPromise = util.promisify(exec);


const backupMainCollections = (ts: number, logPath: string) => {
  const backupPrefixName = `${appConfig.appPrefixTag}_main`;
  const backupFileName = `${backupPrefixName}_${ts}.gz`;
  const backupPath = path.join(path.resolve(appConfig.backupDir), backupFileName);

  return new Promise((resolve, reject) => {
    const command = `${BackupUtil.getMongodumpCommand(appConfig.mongoUri)} --archive="${backupPath}" --excludeCollectionsWithPrefix="${timeSeriesCollectionPrefix}"`;

  });
}