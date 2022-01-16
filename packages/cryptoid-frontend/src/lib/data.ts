import { writable } from 'svelte/store';
import { log } from './log';
import { sendWebsocketMessage } from './websocket';
let cpuTimerEn = false;
let memTimerEn = false;

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

export async function toggleCPUTimer(): Promise<void> {
	log('INFO', 'Toggling CPU timer');
	if(cpuTimerEn == false) {
		var cpuTimer = setInterval(getCpuUsage, 2500);
		cpuTimerEn = true;
	} else {
		clearInterval(cpuTimer);
		cpuTimerEn = false;
	}
}

export async function toggleMemTimer(): Promise<void> {
	log('INFO', 'Toggling memory timer');
	if(memTimerEn == false) {
		var memTimer = setInterval(getMemUsage, 250);
		memTimerEn = true;
	} else {
		clearInterval(memTimer);
		memTimerEn = false;
	}
}
