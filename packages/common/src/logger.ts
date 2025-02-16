import fs from 'fs';

export class Logger {
  static log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  static writeLogFile(message: string, logFile: string, printLog: boolean) {
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
