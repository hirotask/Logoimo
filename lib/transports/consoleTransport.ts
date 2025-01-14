import { defaultConsoleFormatter } from '../formatter/defaultFormatter';
import { ConsoleFormatter } from '../formatter/types';
import { LogRecord } from '../logRecord';
import { Transport } from '../types';

export interface ConsoleTransportOptions {
    /**
     * The formatter to use.
     * Defaults to {@link defaultConsoleFormatter}
     */
    formatter?: ConsoleFormatter;
    /**
     * The console to log to.
     * Defaults to {@link console}
     */
    console?: Console;
}

class ConsoleTransport implements Transport {
    private readonly formatter: ConsoleFormatter;
    private readonly console: Console;

    constructor(options: ConsoleTransportOptions) {
        this.formatter = options.formatter ?? defaultConsoleFormatter;
        this.console = options.console ?? globalThis.console;
    }

    log(logRecord: LogRecord): void {
        const args = this.formatter(logRecord);
        if (logRecord.level === 'debug') this.console.debug(...args);
        else if (logRecord.level === 'info') this.console.info(...args);
        else if (logRecord.level === 'warn') this.console.warn(...args);
        else if (logRecord.level === 'error' || logRecord.level === 'fatal') {
            this.console.error(...args);
        } else {
            this.console.log(...args);
        }
    }
}

export default ConsoleTransport;
