import { LogRecord } from '../logRecord';

const logLevelStyles: Record<string, string> = {
    debug: 'background-color: gray; color: white;',
    info: 'background-color: white; color: black;',
    warning: 'background-color: orange; color: black;',
    error: 'background-color: red; color: white;',
    fatal: 'background-color: maroon; color: white;',
};

/**
 * The default console formatter.
 *
 * @param record The log record to format.
 * @returns The formatted log record, as an array of arguments for
 *          {@link console.log}.
 */
export function defaultConsoleFormatter(record: LogRecord): readonly unknown[] {
    let msg = '';
    const values: unknown[] = [];
    for (let i = 0; i < record.message.length; i++) {
        if (i % 2 === 0) msg += record.message[i];
        else {
            msg += '%o';
            values.push(record.message[i]);
        }
    }
    const date = new Date(record.timestamp);
    const time = `${date.getUTCHours().toString().padStart(2, '0')}:${date
        .getUTCMinutes()
        .toString()
        .padStart(
            2,
            '0'
        )}:${date.getUTCSeconds().toString().padStart(2, '0')}.${date
        .getUTCMilliseconds()
        .toString()
        .padStart(3, '0')}`;
    return [
        `%c${time} %c${record.level} %c${msg}%c`,
        'color: gray;',
        logLevelStyles[record.level],
        'color: gray;',
        'color: default;',
        ...values,
    ];
}
