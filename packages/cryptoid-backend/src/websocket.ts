import { BackendResponse, BackendResponseType, FrontendRequest } from "cryptoid-types";
import { WebSocket } from "ws";
export async function sendWebsocketMessage(websocket: WebSocket, type: BackendResponseType, request: FrontendRequest, data?: unknown) {
    const message: BackendResponse = {
        timestamp: Date.now(),
        type: type,
        requestId: request.requestId,
        responseTo: request.requestType,
        data: data
    }
    websocket.send(JSON.stringify(message))
}