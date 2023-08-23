import { BASE_URL_WS, WEBSOCKET_RECONNECT_TIME } from "./config";

function websocketUrl() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("group")) {
        params.set("group", "default");
    }
    if (!params.has("name")) {
        const randomId = Math.random().toString(36).substring(7);
        params.set("name", randomId);
    }
    window.history.replaceState({}, "", `?${params}`);
    return BASE_URL_WS + `/api/overlay/?${params}`;
}

export function connectWebSocket(onmessage: (event: MessageEvent) => void) {
    const socket = new WebSocket(websocketUrl());

    socket.onopen = () => {
        console.log("WebSocket connection established.");
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onmessage = onmessage;

    socket.onclose = (event) => {
        console.log("WebSocket connection closed with code:", event.code);
        setTimeout(() => {
            connectWebSocket(onmessage);
        }, WEBSOCKET_RECONNECT_TIME);
    };
}
