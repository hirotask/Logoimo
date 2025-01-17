import { LogLevel } from '..';
import UpperSelector from './upperSelector';

describe('UpperSelector - evaluate', () => {
    const logLevels: LogLevel = {
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        FATAL: 5,
    };

    test('should return true if the log level is greater than or equal to the base level', () => {
        const selector = new UpperSelector({ baseLevel: 'WARN', logLevels });

        expect(selector.evaluate('WARN')).toBe(true); // Equal to base level
        expect(selector.evaluate('ERROR')).toBe(true); // Greater than base level
        expect(selector.evaluate('FATAL')).toBe(true); // Greater than base level
    });

    test('should return false if the log level is less than the base level', () => {
        const selector = new UpperSelector({ baseLevel: 'WARN', logLevels });

        expect(selector.evaluate('DEBUG')).toBe(false);
        expect(selector.evaluate('INFO')).toBe(false);
    });

    test('should return false if the base level is not found in logLevels', () => {
        const selector = new UpperSelector({
            baseLevel: 'NON_EXISTENT',
            logLevels,
        });

        expect(selector.evaluate('WARN')).toBe(false);
    });

    test('should return false if the provided log level is not found in logLevels', () => {
        const selector = new UpperSelector({ baseLevel: 'WARN', logLevels });

        expect(selector.evaluate('NON_EXISTENT')).toBe(false);
    });

    test('should return false if both base level and provided log level are not found in logLevels', () => {
        const selector = new UpperSelector({
            baseLevel: 'NON_EXISTENT',
            logLevels,
        });

        expect(selector.evaluate('NON_EXISTENT')).toBe(false);
    });
});
