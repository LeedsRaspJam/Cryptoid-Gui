import { writable } from 'svelte/store';
import { v4 as generateUuid } from 'uuid';
import type { FrontendRequestType, FrontendRequest, BackendResponse } from 'cryptoid-types';
import { log } from './log';
let websocket: WebSocket;
export async function connect(connectionUrl: string): Promise<void> {
	try {
		websocket = new WebSocket(connectionUrl);
	} catch (err) {
		log('ERROR', 'Error connecting to websocket: ' + err);
		websocket = null;
		return;
	}
	websocket.onopen = () => {
		log('SUCCESS', 'Websocket connection established');
	};
	websocket.onmessage = (message) => {
		websocketMessages.set(message.data);
	};
	websocket.onclose = () => {
		log('WARN', 'Websocket was closed');
	};
	websocket.onerror = (err) => {
		log('ERROR', 'Websocket error: ' + JSON.stringify(err));
	};
}

export function sendWebsocketMessage(
	type: FrontendRequestType,
	data?: string
): Promise<Record<string, unknown>> {
	return new Promise(function (resolve, reject) {
		if (!websocket || websocket.readyState != WebSocket.OPEN) {
			log('ERROR', 'Attempt to send a websocket message whilst the websocket is closed', {
				logToConsole: false
			});
			reject('Attempt to send a websocket message whilst the websocket is closed');
		}

		const requestId = generateUuid();
		const websocketMessage: FrontendRequest = {
			timestamp: Date.now(),
			requestId: requestId,
			requestType: type,
			data: data
		};
		log('DEBUG', 'Sending request with ID:' + requestId);
		websocket.send(JSON.stringify(websocketMessage));
		const unsubscribe = websocketMessages.subscribe((value: string) => {
			let parsedResponse: BackendResponse;
			try {
				parsedResponse = JSON.parse(value);
			} catch {
				// Hehe
			}
			if (parsedResponse?.requestId) {
				const recievedRequestId = parsedResponse.requestId;
				if (recievedRequestId == requestId) {
					log('DEBUG', 'Recieved request with request ID: ' + parsedResponse.requestId);
					resolve(JSON.parse(value));
					unsubscribe();
				}
			}
		});
	});
}
export const websocketMessages = writable();
