import displayContent from "./displayContent.ts";
import { connectWebSocket } from "./websocket.ts";

import "./style.css";
import {Content, SimpleContent} from "./generated.content.ts";

let data: Content | SimpleContent | null = null;
let abortController: AbortController = new AbortController();

async function processEvent(event: MessageEvent) {
    const newData = JSON.parse(event.data);
    if (data == newData)
        return;
    data = newData;
    abortController.abort();
    abortController = new AbortController();
    const signal = abortController.signal;
    while (!signal.aborted) {
        await displayContent(data, signal);
    }
}

connectWebSocket(processEvent);
