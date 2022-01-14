import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { v4 as generateUuid } from 'uuid';
import type { FrontendRequestType, FrontendRequest, BackendResponse } from 'cryptoid-types';
let websocket: WebSocket;
export async function connect(connectionUrl: string): Promise<void> {
	if (!browser) return;
	websocket = new WebSocket(connectionUrl);
	websocket.onopen = () => {
		console.log('Opened');
	};
	websocket.onmessage = (message) => {
		websocketMessages.set(message.data);
	};
}

export function sendWebsocketMessage(
	type: FrontendRequestType,
	data?: string
): Promise<Record<string, any>> {
	return new Promise(function (resolve, reject) {
		const requestId = generateUuid();
		const websocketMessage: FrontendRequest = {
			timestamp: Date.now(),
			requestId: requestId,
			requestType: type,
			data: data
		};
		console.log('Sending request with ID:' + requestId);
		websocket.send(JSON.stringify(websocketMessage));
		const unsubscribe = websocketMessages.subscribe((value: string) => {
			let parsedResponse: BackendResponse;
			try {
				parsedResponse = JSON.parse(value);
			} catch {
				// Hehe
			}
			if (parsedResponse?.data) {
				console.log('Recieved request with request ID: ' + parsedResponse.requestId);
				const recievedRequestId = parsedResponse.requestId;
				if (recievedRequestId == requestId) {
					unsubscribe();
					resolve(JSON.parse(value));
				}
			}
		});
	});
}
export const websocketMessages = writable();
