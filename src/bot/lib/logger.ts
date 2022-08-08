enum LoggingLevel {
  debug = 0,
  log,
  warn,
  error,
}

export const createLogger = (minLevel = LoggingLevel.debug) => {
  const debug = (...args: any[]) => {
    if (minLevel <= LoggingLevel.debug) {
      console.debug(Date.now(), ...args);
    }
  };

  const log = (...args: any[]) => {
    if (minLevel <= LoggingLevel.log) {
      console.log(Date.now(), ...args);
    }
  };

  const warn = (...args: any[]) => {
    if (minLevel <= LoggingLevel.warn) {
      console.warn(Date.now(), ...args);
    }
  };

  const error = (...args: any[]) => {
    if (minLevel <= LoggingLevel.error) {
      console.error(Date.now(), ...args);
    }
  };

  return {
    debug,
    log,
    warn,
    error,
  };
};

export const logger = createLogger(
  process.env.NODE_ENV === 'production' ? LoggingLevel.warn : LoggingLevel.debug
);
