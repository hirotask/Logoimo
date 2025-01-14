/**
 * A log record.
 * This information is used to output logs.
 */
export interface LogRecord {
    /**
     * The log level.
     */
    readonly level: string;
    /**
     * The message to log.
     */
    readonly message: unknown[];
    /**
     * The timestamp of the log record in milliseconds since the Unix epoch.
     */
    readonly timestamp: number;
}
