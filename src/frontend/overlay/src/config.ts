const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT ?? window.location.port;

const WS_PROTO = window.location.protocol === "https:" ? "wss://" : "ws://";
export const BASE_URL_WS = import.meta.env.VITE_WEBSOCKET_URL ?? (WS_PROTO + window.location.hostname + ":" + BACKEND_PORT);

export const WEBSOCKET_RECONNECT_TIME = 5000;
