import { Server } from "ws";
import type { FrontendRequest } from "cryptoid-types";
import { getCpuUsage, getMemUsage } from "./data";
import { sendWebsocketMessage } from "./websocket";
import { SerialPort } from "serialport";

const hcp = new SerialPort("/dev/ttyAMA0", baudRate=115200, parity=even);

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
      case "MEM_USAGE":
        await sendWebsocketMessage(ws, parsedData, await getMemUsage());
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
