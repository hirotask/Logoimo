import Logger from './logger';

class ExceptionHandler {
    private readonly logger: Logger;
    private readonly handlers: Map<string, unknown>;

    constructor(logger: Logger) {
        this.logger = logger;
        this.handlers = new Map();
    }
}

export default ExceptionHandler;
