
export class DateUtil {
  static getCurrentDate() {
    return new Date().toDateString();
  }
  static getCurrentTime() {
    return new Date().toTimeString();
  }
  static getCurrentTimestamp() {
    return new Date().getTime();
  }
  static getCurrentTimeSimpleFormat() {
    return `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`;
  }
}