import { Server } from "ws";
import type { FrontendRequest } from "cryptoid-types";
import { getCpuUsage } from "./data";
import { sendWebsocketMessage } from "./websocket";
// Creating a new websocket server
const wss = new Server({ port: parseInt(process.env.port || String(8080)) });
wss.on("connection", (ws) => {
  console.log("Websocket client connected");
  // sending message
  ws.on("message", async (data) => {
    let parsedData: FrontendRequest;
    try {
      parsedData = JSON.parse(data.toString());
    } catch {
      console.log("Error parsing JSON");
      return;
    }
    switch (parsedData.requestType) {
      case "CPU_USAGE":
        await sendWebsocketMessage(ws, parsedData, await getCpuUsage());
        break;
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
  ws.onerror = function (err) {
    console.log("An error occured: ", err);
  };
});
