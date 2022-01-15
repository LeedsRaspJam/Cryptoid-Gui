type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'SUCCESS';
const colours = {
	ERROR: 'red',
	WARN: 'orange',
	INFO: 'green',
	DEBUG: 'gray',
	SUCCESS: 'green'
};
import { writable } from 'svelte/store';
export let debug = false;

export async function toggleDebug(): Promise<void> {
	debug = !debug;
}
interface LogOptions {
	logToConsole?: boolean;
	logToUser?: boolean;
}
export async function log(level: LogLevel, message: string, options?: LogOptions): Promise<void> {
	if (level == 'DEBUG' && !debug) return; // Don't log debug by default
	if (options?.logToConsole ?? true) {
		console.log(`%c${level}` + '%c: ' + message, `color: ${colours[level]}`);
	}
	if (level == 'INFO' && process.env.NODE_ENV == 'production' && !debug) return;
	if (options?.logToUser ?? true) {
		logStore.set({ level: level, message: message });
	}
}
export const logStore = writable();
