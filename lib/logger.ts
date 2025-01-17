import ExceptionHandler from './exceptionHandler';
import { Formatter } from './formatter/types';
import { LogLevel, LogLevelSelector } from './logLevel/index';
import { LogRecord } from './logRecord';
import BaseTransport from './transports';

export interface LoggerConfig {
    levels: LogLevel;
    levelSelector: LogLevelSelector;
    exitOnError: boolean;
    exceptionHandlers: ExceptionHandler[];
    transports: BaseTransport[];
    formatter: Formatter;
}

class Logger {
    private readonly config: LoggerConfig;

    constructor(config: LoggerConfig) {
        this.config = config;
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
        for (const transport of this.config.transports) {
            try {
                transport.log(logRecord, this.config);
            } catch (error) {
                console.error(error);
            }
        }
    }

    doLog(level: string, rawMessage?: string, ...properties: unknown[]): void {
        const message = this.parseMessage(rawMessage, properties);

        const record: LogRecord = {
            level,
            message,
            timestamp: Date.now(),
        };

        this.emit(record);
    }
}

export default Logger;
