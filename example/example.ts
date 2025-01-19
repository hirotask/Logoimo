import DefaultLogger from '../lib/defaultLogger';

const logger = new DefaultLogger();

logger.doLog('error', 'Hello world');
logger.doLog('warn', 'Hello world');
logger.doLog('info', 'Hello world');
logger.doLog('http', 'Hello world');
logger.doLog('verbose', 'Hello world');
logger.doLog('baka', 'Hello world');
