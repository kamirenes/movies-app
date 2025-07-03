export function logInfo(message, context = {}) {
  console.log(`[INFO] ${message}`, context);
}

export function logError(message, error = {}) {
  console.error(`[ERROR] ${message}`, {
    message: error.message,
    stack: error.stack,
    ...error,
  });
}

export function logWarn(message, context = {}) {
  console.warn(`[WARN] ${message}`, context);
}
