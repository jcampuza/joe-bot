enum LoggingLevel {
  debug = 0,
  log,
  warn,
  error,
}

export class Logger {
  constructor(private minLevel = LoggingLevel.debug) {}

  debug(...args: any[]) {
    if (this.minLevel <= LoggingLevel.debug) {
      console.debug(Date.now(), ...args);
    }
  }

  log(...args: any[]) {
    if (this.minLevel <= LoggingLevel.log) {
      console.log(Date.now(), ...args);
    }
  }

  warn(...args: any[]) {
    if (this.minLevel <= LoggingLevel.warn) {
      console.warn(Date.now(), ...args);
    }
  }

  error(...args: any[]) {
    if (this.minLevel <= LoggingLevel.error) {
      console.error(Date.now(), ...args);
    }
  }
}

export const logger = new Logger(
  process.env.NODE_ENV === 'production' ? LoggingLevel.warn : LoggingLevel.debug
);
