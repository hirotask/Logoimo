import Logger from './logger';
import ConsoleTransport from './transports/consoleTransport';

const logger = new Logger({
    transports: [new ConsoleTransport({})],
});

logger.doLog('info', 'Hello world');
