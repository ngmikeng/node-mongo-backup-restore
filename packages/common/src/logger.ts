import fs from 'fs';
import { IParamWriteLogFile } from './types/logger-type';

export class Logger {
  static log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  static writeLogFile({ message, logFile, printLog = true }: IParamWriteLogFile) {
    const messageLog = `[LOG]: ${message}\n`;
    if (logFile) {
      fs.appendFile(logFile, messageLog, (err) => {
        if (err) {
          console.error(`Error writing log file: ${err.message}`);
        }
      });
    }
    if (printLog) {
      console.log(messageLog);
    }
  }
}
