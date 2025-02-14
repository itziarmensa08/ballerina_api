import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
});

if (process.env.NODE_ENV !== 'prod') {
    logger.add(new transports.Console({
        format: format.combine(
        format.colorize(),
        format.simple()
        )
    }));
}

export default logger;