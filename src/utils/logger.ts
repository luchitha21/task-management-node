import pino from 'pino';

// Create a Pino logger instance
const logger = pino({
    formatters: {
        level(level) {
            return { level };
        },
    },
});
export default logger;
