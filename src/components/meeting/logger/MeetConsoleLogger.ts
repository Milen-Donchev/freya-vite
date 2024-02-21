import { LogLevel, Logger } from 'amazon-chime-sdk-js';

export default class MeetConsoleLogger implements Logger {
  name: string;
  level: LogLevel;
  metadata: {};

  constructor({ name = '', level = LogLevel.WARN, metadata = {} }) {
    this.name = name;
    this.level = level;
    this.metadata = metadata;
  }

  info(msg: string): void {
    this.log(LogLevel.INFO, msg);
  }

  warn(msg: string): void {
    this.log(LogLevel.WARN, msg);
  }

  error(msg: string): void {
    this.log(LogLevel.ERROR, msg);
  }

  debug(debugFunction: string | (() => string)): void {
    if (LogLevel.DEBUG < this.level) {
      return;
    }

    if (typeof debugFunction === 'string') {
      this.log(LogLevel.DEBUG, debugFunction);
    } else if (debugFunction) {
      this.log(LogLevel.DEBUG, debugFunction());
    } else {
      this.log(LogLevel.DEBUG, '' + debugFunction);
    }
  }

  setLogLevel(level: LogLevel): void {
    this.level = level;
  }

  getLogLevel(): LogLevel {
    return this.level;
  }

  private log(type: LogLevel, msg: string): void {
    if (type < this.level) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${LogLevel[type]}] ${this.name} - ${msg}`;

    switch (type) {
      case LogLevel.ERROR:
        // eslint-disable-next-line
        console.error(logMessage);
        break;
      case LogLevel.WARN:
        // eslint-disable-next-line
        console.warn(logMessage);
        break;
      case LogLevel.DEBUG:
        // eslint-disable-next-line
        console.debug(logMessage.replace(/\\r\\n/g, '\n'));
        break;
      case LogLevel.INFO:
        // eslint-disable-next-line
        console.info(logMessage);
        break;
    }
  }
}
