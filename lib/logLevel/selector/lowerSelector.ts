import { LogLevel, LogLevelSelector, LogLevelSelectorParam } from '../index';

class LowerSelector implements LogLevelSelector {
    readonly baseLevel: string;
    readonly logLevels: LogLevel;

    constructor(param: LogLevelSelectorParam) {
        this.baseLevel = param.baseLevel;
        this.logLevels = param.logLevels;
    }

    evaluate(a: string): boolean {
        const baseNum = this.logLevels[this.baseLevel];
        const num = this.logLevels[a];
        if (baseNum == null || num == null) return false;

        if (num <= baseNum) {
            return true;
        }

        return false;
    }
}

export default LowerSelector;
