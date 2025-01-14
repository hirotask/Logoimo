import { LogRecord } from './logRecord';

export interface Transport {
    log(logRecord: LogRecord): void;
}
