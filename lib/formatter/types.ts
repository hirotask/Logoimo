import { LogRecord } from '../logRecord';

export type ConsoleFormatter = (logRecord: LogRecord) => readonly unknown[];
