let log = console.log;

const sendNotification = text => {
    if (Notification.permission === 'granted') {
        const n = new Notification('WS and SW', {
            body: text,
        });
        n.onclick = () => n.close();
        setTimeout(n.close(), 1 * 1000);
    }
}

if (window.Notification && Notification.permission !== "denied") {
	Notification.requestPermission(status => {
        if (status === 'granted') {
            log = sendNotification;
        }
	});
}

let socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
    log("[open] Connection established");
    log("Sending to server");
    socket.send("ping");
};

socket.onmessage = event => {
    log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = event => {
    if (event.wasClean) {
        log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        log('[close] Connection died');
    }
};

socket.onerror = error => {
    log(`[error] ${error.message}`);
};
