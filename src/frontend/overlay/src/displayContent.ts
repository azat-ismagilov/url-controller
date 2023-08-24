import axios from "axios";
import textFit from "textfit";
import videojs from "video.js";

import {Content, SimpleContent} from "./generated.content.ts";
import listDirectory from "./listDirectory.ts";

import "video.js/dist/video-js.min.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const DEFAULT_DURATION_SECONDS = 100000;

function delay(seconds: number, abortSignal: AbortSignal) {
    return new Promise((resolve, reject) => {
        if (abortSignal.aborted) {
            reject();
            return;
        }
        const timeout = setTimeout(resolve, seconds * 1000);
        abortSignal.addEventListener( 'abort', () => {
            clearTimeout(timeout);
            reject();
        } );
    });
}

function displayNothing() {
    app.innerHTML = "";
}

async function displayIFrame(content: Content.IFrame, abortSignal: AbortSignal) {
    if (abortSignal.aborted)
        return;
    app.innerHTML = `<iframe class="content iframe" src="${content.url}" />`;

    await delay(content.durationSeconds || DEFAULT_DURATION_SECONDS, abortSignal);
}

async function displayText(content: Content.Text, abortSignal: AbortSignal) {
    if (abortSignal.aborted)
        return;
    app.innerHTML = `
        <div class="content fit">
            ${content.text}
        </div>
    `;
    textFit(app.getElementsByClassName("fit"), {
        multiLine: true,
        alignVert: true,
        alignHoriz: true,
        maxFontSize: 200,
    });

    await delay(content.durationSeconds || DEFAULT_DURATION_SECONDS, abortSignal);
}

async function displaySingleImage(url: string, durationSeconds: number | null | undefined, abortSignal: AbortSignal) {
    if (abortSignal.aborted)
        return;
    app.innerHTML = `
        <img class="content fullscreen-img" src="${url}" alt="Image"/>
    `;

    await delay(durationSeconds || DEFAULT_DURATION_SECONDS, abortSignal);
}
async function displayImage(content: Content.Image, abortSignal: AbortSignal) {
    await displaySingleImage(content.url, content.durationSeconds, abortSignal);
}

async function displayImageFolder(content: Content.ImageFolder, abortSignal: AbortSignal) {
    const images = await listDirectory(content.url, abortSignal);
    for (const image of images) {
        if (abortSignal.aborted)
            return;
        await displaySingleImage(image, content.durationSeconds, abortSignal);
    }
}

async function displaySmartSVG(content: Content.SmartSVG, abortSignal: AbortSignal) {
    const response = await axios.get(content.url, {
        signal: abortSignal
    });
    let svg = response.data;
    for (const {from, to} of content.substitutions) {
        const regex = new RegExp("{" + from + "}", "g");
        svg = svg.replace(regex, to);
    }

    if (abortSignal.aborted)
        return;
    app.innerHTML = ` 
        <div class="content">
            ${svg}
        </div>
    `;

    await delay(content.durationSeconds || DEFAULT_DURATION_SECONDS, abortSignal);
}

async function displaySingleVideo(src: object, abortSignal: AbortSignal) {
    const videoElement = document.createElement("video");
    videoElement.className = "content video-js";

    if (abortSignal.aborted)
        return;
    app.innerHTML = "";
    app.appendChild(videoElement);

    const player = videojs(videoElement, {
        autoplay: "any"
    });

    player.src(src);

    await new Promise<void>((resolve, reject) => {
        function onPlayerEnd() {
            player.dispose();
            resolve();
        }

        player.on("ended", onPlayerEnd);

        abortSignal.addEventListener("abort", () => {
            player.off("ended", onPlayerEnd);
            reject();
        });
    });
}

async function displayVideo(content: Content.Video, abortSignal: AbortSignal) {
    await displaySingleVideo({src: content.url}, abortSignal);
}

async function displayVideoFolder(content: Content.VideoFolder, abortSignal: AbortSignal) {
    const videos = await listDirectory(content.url, abortSignal);
    for (const video of videos) {
        if (abortSignal.aborted)
            return;
        await displaySingleVideo({src: video}, abortSignal);
    }
}

export default async function displayContent(content: Content | SimpleContent | null,
                                             abortSignal: AbortSignal) {
    if (!content) {
        displayNothing();
        return;
    }
    switch (content.type) {
        case Content.Type.IFrame:
            await displayIFrame(content, abortSignal);
            break;
        case Content.Type.Text:
            await displayText(content, abortSignal);
            break;
        case Content.Type.Image:
            await displayImage(content, abortSignal);
            break;
        case Content.Type.ImageFolder:
            await displayImageFolder(content, abortSignal);
            break;
        case Content.Type.SmartSVG:
            await displaySmartSVG(content, abortSignal);
            break;
        case Content.Type.Video:
            await displayVideo(content, abortSignal);
            break;
        case Content.Type.VideoFolder:
            await displayVideoFolder(content, abortSignal);
            break;
        case Content.Type.Sequence:
            for (const item of content.sequence) {
                await displayContent(item, abortSignal);
                if (abortSignal.aborted)
                    return;
            }
            break;
    }
}
