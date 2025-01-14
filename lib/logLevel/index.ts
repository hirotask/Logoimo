export interface LogLevel {
    [key: string]: number;
}


export interface LogLevelSelectorParam { 
	baseLevel: string
	logLevels: LogLevel
}

export type LogLevelSelector = {
    evaluate(a: string): boolean;
} & LogLevelSelectorParam

