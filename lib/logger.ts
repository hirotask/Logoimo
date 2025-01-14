import ExceptionHandler from './exceptionHandler';
import { LogLevel, LogLevelSelector } from './logLevel/index';
import UpperSelector from './logLevel/selector/upperSelector';
import { LogRecord } from './logRecord';
import { Transport } from './types';

interface LoggerConfig {
    levels?: LogLevel;
    level?: LogLevelSelector;
    exitOnError?: boolean;
    exceptionHandlers?: ExceptionHandler[];
    transports: Transport[];
}

const defaultLogLevels: LogLevel = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};

class Logger {
    private readonly levels: LogLevel;
    private readonly level: LogLevelSelector;
    private readonly exitOnError: boolean;
    private readonly exceptionHandlers: ExceptionHandler[];
    private readonly transports: Transport[];

    constructor(config: LoggerConfig) {
        this.levels = config.levels ?? defaultLogLevels;
        this.level =
            config.level ??
            new UpperSelector({
                logLevels: this.levels,
                baseLevel: 'info',
            });
        this.exitOnError = config.exitOnError ?? false;
        this.exceptionHandlers = config.exceptionHandlers ?? [];
        this.transports = config.transports;
    }

    private parseMessage(
        rawMessage: string | undefined,
        properties: unknown[]
    ): unknown[] {
        const message: unknown[] = [];

        if (rawMessage != null) {
            message.push(rawMessage);
        } else {
            message.push('');
        }

        if (properties.length > 0) {
            message.push({
                properties,
            });
        }

        return message;
    }

    private emit(logRecord: LogRecord): void {
        for (const transport of this.transports) {
            try {
                transport.log(logRecord);
            } catch (error) {
                console.error(error);
            }
        }
    }

    doLog(level: string, rawMessage?: string, ...properties: unknown[]): void {
        if (this.level.evaluate(level)) {
            const message = this.parseMessage(rawMessage, properties);

            const record: LogRecord = {
                level,
                message,
                timestamp: Date.now(),
            };
            this.emit(record);
        }
    }
}

export default Logger;
