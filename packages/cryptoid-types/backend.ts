import type { FrontendRequestType } from "./frontend";

export interface BackendWebsocketMessage {
    responseTo: FrontendRequestType
    data?: unknown
}
export type BackendResponseType = 'RESPONSE'

export interface BackendResponse extends BackendWebsocketMessage {
    timestamp: number
    requestId: string
    type: BackendResponseType
}

export interface CpuUsageResponse {
    totalMemory: number,
    freeMemory: number
}
