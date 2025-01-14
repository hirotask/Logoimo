import { LogRecord } from './logRecord';

export interface LogLevel {
    [key: string]: number;
}

export interface LogLevelSelector {
    evaluate(a: string): boolean;
}

export interface Transport {
    log(logRecord: LogRecord): void;
}
