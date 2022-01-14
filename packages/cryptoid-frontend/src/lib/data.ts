import { writable } from 'svelte/store';
import { sendWebsocketMessage } from './websocket';
// @ts-expect-error Yes
export const cpuUsage: CpuUsageResponse = writable();

export async function getCpuUsage(): Promise<void> {
	const websocketResponse = await sendWebsocketMessage('CPU_USAGE');
	cpuUsage.set(websocketResponse.data);
}
