export type FrontendRequestType = "CPU_USAGE" | "MEM_USAGE";

export interface FrontendRequest {
  timestamp: number;
  requestId: string;
  requestType: FrontendRequestType;
  data?: string;
}
