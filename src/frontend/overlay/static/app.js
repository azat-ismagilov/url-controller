const containerDiv = document.getElementById("container");

function websocketUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const host = window.location.host;
    const params = new URLSearchParams(window.location.search);
    if (!params.has('group')) {
        params.set('group', 'default');
    }
    if (!params.has('name')) {
        const randomId = Math.random().toString(36).substring(7);
        params.set('name', randomId);
    }
    window.history.replaceState({}, '', `?${params}`);
    return `${protocol}://${host}/api/overlay/?${params}`;
}

function connectWebSocket() {
    let socket = new WebSocket(websocketUrl());

    socket.onopen = () => {
        console.log('WebSocket connection established.');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onmessage = (event) => {
        const url = event.data;
        showContent(url);
    };

    socket.onclose = (event) => {
        console.log('WebSocket connection closed with code:', event.code);
        setTimeout(() => {
            connectWebSocket();
        }, 2000);
    };
}

connectWebSocket();

let currentUrl = '';

function showContent(url) {
    if (url !== currentUrl) {
        if (isImage(url)) {
            displayImage(url);
        } else {
            displayIframe(url);
        }
    }
};

function isImage(url) {
    return url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif");
}

function displayIframe(url) {
    containerDiv.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = url;

    containerDiv.appendChild(iframe);

    fadeElement(iframe);
}

function displayImage(url) {
    containerDiv.innerHTML = '';

    const img = document.createElement('img');
    img.src = url;

    containerDiv.appendChild(img);

    fadeElement(img);
}

function fadeElement(element) {
    element.style.opacity = "0";
    setTimeout(() => {
        element.style.opacity = "1";
    }, 100);
}
