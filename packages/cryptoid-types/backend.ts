import type { FrontendRequestType } from "./frontend";

export interface BackendWebsocketMessage {
  responseTo: FrontendRequestType;
  data?: unknown;
}

export interface BackendResponse extends BackendWebsocketMessage {
  timestamp: number;
  requestId: string;
}

export interface CpuUsageResponse {
  cpuCount: number;
  cpuUsage: number;
}

export interface MemUsageResponse {
  freeMem: string;
  totalMem: string;
  processMem: string;
}
