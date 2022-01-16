import { writable } from 'svelte/store';
import { log } from './log';
import { sendWebsocketMessage } from './websocket';

// @ts-expect-error Yes
export const cpuUsage: CpuUsageResponse = writable();

export async function getCpuUsage(): Promise<void> {
	const websocketResponse = await sendWebsocketMessage('CPU_USAGE');
	cpuUsage.set(websocketResponse.data);
}

// @ts-expect-error Yes
export const memUsage: MemUsageResponse = writable();
export async function getMemUsage(): Promise<void> {
	const websocketResponse = await sendWebsocketMessage('MEM_USAGE');
	memUsage.set(websocketResponse.data);
}

export async function enableCPUTimer(): Promise<void> {
	log('INFO', 'Enabling CPU timer');
	setInterval(getCpuUsage, 1000);
}

export async function enableMemTimer(): Promise<void> {
	log('INFO', 'Enabling memory timer');
	setInterval(getMemUsage, 250);
}
