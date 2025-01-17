import { simpleFormatter } from './formatter/simpleFormatter';
import Logger, { LoggerConfig } from './logger';
import { LogLevel } from './logLevel';
import LowerSelector from './logLevel/selector/lowerSelector';
import ConsoleTransport from './transports/consoleTransport';

export type DefaultLoggerConfig = Partial<LoggerConfig>;

export const defaultLogLevels: LogLevel = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
} as const;

class DefaultLogger extends Logger {
    constructor(config?: DefaultLoggerConfig) {
        super({
            levelSelector:
                config?.levelSelector ??
                new LowerSelector({
                    baseLevel: 'info',
                    logLevels: defaultLogLevels,
                }),
            levels: config?.levels ?? defaultLogLevels,
            exitOnError: config?.exitOnError ?? true,
            exceptionHandlers: config?.exceptionHandlers ?? [],
            transports: config?.transports ?? [new ConsoleTransport()],
            formatter: config?.formatter ?? simpleFormatter,
        });
    }
}

export default DefaultLogger;
