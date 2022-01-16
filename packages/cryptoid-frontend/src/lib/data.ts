import { writable } from 'svelte/store';
import { log } from './log';
import { sendWebsocketMessage } from './websocket';

// @ts-expect-error Yes
export const cpuUsage: CpuUsageResponse = writable();

export async function getCpuUsage(): Promise<void> {
	log('INFO', 'Requesting CPU usage');
	const websocketResponse = await sendWebsocketMessage('CPU_USAGE');
	cpuUsage.set(websocketResponse.data);
}

// @ts-expect-error Yes
export const memUsage: MemUsageResponse = writable();
export async function getMemUsage(): Promise<void> {
	log('INFO', 'Requesting CPU usage');
	const websocketResponse = await sendWebsocketMessage('MEM_USAGE');
	memUsage.set(websocketResponse.data);
}
