import { LogRecord } from '../logRecord';

export type Formatter = (logRecord: LogRecord) => readonly unknown[];
