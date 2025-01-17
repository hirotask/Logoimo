import ExceptionHandler from '../exceptionHandler';
import { Formatter } from '../formatter/types';
import { LogLevel, LogLevelSelector } from '../logLevel';
import { LogRecord } from '../logRecord';
import { LoggerConfig } from '../logger';

export interface TransportOptions {
    levels?: LogLevel;
    levelSelector?: LogLevelSelector;
    exitOnError?: boolean;
    exceptionHandlers?: ExceptionHandler[];
    formatter?: Formatter;
}

export type TransportContext = Required<TransportOptions> &
    LogRecord & {
        logMessage: readonly unknown[];
    };

abstract class BaseTransport {
    protected readonly options: TransportOptions | null;

    constructor(options?: TransportOptions) {
        this.options = options ?? null;
    }

    private createTransportContext(
        logRecord: LogRecord,
        config: LoggerConfig
    ): TransportContext {
        const options: Required<TransportOptions> = {
            levels: this.options?.levels ?? config.levels,
            levelSelector: this.options?.levelSelector ?? config.levelSelector,
            exitOnError: this.options?.exitOnError ?? config.exitOnError,
            exceptionHandlers:
                this.options?.exceptionHandlers ?? config.exceptionHandlers,
            formatter: this.options?.formatter ?? config.formatter,
        };

        const logMessage = options.formatter(logRecord);

        const context: TransportContext = {
            ...logRecord,
            ...options,
            logMessage,
        };

        return context;
    }

    public log(logRecord: LogRecord, config: LoggerConfig): void {
        const context = this.createTransportContext(logRecord, config);

        if (context.levelSelector.evaluate(logRecord.level)) {
            this.doLog(context);
        }
    }

    protected abstract doLog(context: TransportContext): void;
}

export default BaseTransport;
