import "./style.css";
import {connectWebSocket} from "./websocket.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
    <h1>Overlay</h1>
`;

connectWebSocket(() => {})