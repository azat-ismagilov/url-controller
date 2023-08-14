import { Options } from "react-use-websocket";
import { enqueueSnackbar } from "notistack";

const BACKEND_PROTO = window.location.protocol === "https:" ? "https://" : "http://";
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT ?? window.location.port;
export const BASE_URL_BACKEND = process.env.REACT_APP_BACKEND_URL ?? (BACKEND_PROTO + window.location.hostname + ":" + BACKEND_PORT);

const WS_PROTO = window.location.protocol === "https:" ? "wss://" : "ws://";
export const BASE_URL_WS = process.env.REACT_APP_WEBSOCKET_URL ?? (WS_PROTO + window.location.hostname + ":" + BACKEND_PORT);

export const WEBSOCKET_RECONNECT_TIME = 5000;

export const WEBSOCKET_CONFIG: Options = {
    shouldReconnect: () => true,
    onError: (err) => {
        console.error(err);
        enqueueSnackbar("Error in WebSocket",  { variant: "error" });
    },
};
