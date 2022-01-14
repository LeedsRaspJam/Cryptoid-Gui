import { BackendResponse, FrontendRequest } from "cryptoid-types";
import { WebSocket } from "ws";
export async function sendWebsocketMessage(
  websocket: WebSocket,
  request: FrontendRequest,
  data?: unknown
): Promise<void> {
  const message: BackendResponse = {
    timestamp: Date.now(),
    requestId: request.requestId,
    responseTo: request.requestType,
    data: data,
  };
  websocket.send(JSON.stringify(message));
}
