import BaseTransport, { TransportContext, TransportOptions } from '.';

export type ConsoleTransportOptions = TransportOptions & {
    /**
     * The console to log to.
     * Defaults to {@link console}
     */
    console?: Console;
};

class ConsoleTransport extends BaseTransport {
    private readonly console: Console;

    constructor(options?: ConsoleTransportOptions) {
        super(options);
        this.console = options?.console ?? globalThis.console;
    }

    protected doLog(context: TransportContext): void {
        const level = context.level;
        const logMessage = context.logMessage;

        if (level === 'debug') this.console.debug(...logMessage);
        else if (level === 'info') this.console.info(...logMessage);
        else if (level === 'warn') this.console.warn(...logMessage);
        else if (level === 'error' || level === 'fatal') {
            this.console.error(...logMessage);
        } else {
            this.console.log(...logMessage);
        }
    }
}

export default ConsoleTransport;
