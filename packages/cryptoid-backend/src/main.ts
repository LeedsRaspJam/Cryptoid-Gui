import { Server } from 'ws'
import type { FrontendRequest } from 'cryptoid-types'
import { getCpuUsage } from './interface';
import { sendWebsocketMessage } from './websocket';
// Creating a new websocket server
const wss = new Server({ port: 8080 })
wss.on("connection", ws => {
    console.log("new client connected");
    // sending message
    ws.on("message", async data => {
        console.log(data.toString())
        let parsedData: FrontendRequest
        try {
            parsedData = JSON.parse(data.toString())
        } catch {
            console.log('Error parsing JSON')
            return
        }
        switch (parsedData.requestType) {
            case 'CPU_USAGE':
                await sendWebsocketMessage(ws, 'RESPONSE', parsedData, await getCpuUsage())
                break
        }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});