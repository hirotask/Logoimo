import { Formatter } from './formatter';
import { LogLevel, LogLevelSelector } from './logLevel/index';
import { LogRecord } from './logRecord';
import Transport from './transports';

export interface LoggerConfig {
    levels: LogLevel;
    levelSelector: LogLevelSelector;
    exitOnError: boolean;
    exceptionHandlers: Transport[];
    transports: Transport[];
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
            transport.log(logRecord, this.config);
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
