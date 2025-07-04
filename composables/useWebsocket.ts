export const useWebsocket = <T = unknown>(callback: (data: T) => void, path: string = 'chat') => {
    let ws: WebSocket | null = null;

    onMounted(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        ws = new WebSocket(`${protocol}://${window.location.host}/api/${path}`);

        ws.onopen = () => {
            console.log('Forbundet til WebSocket server!');
        };

        ws.onmessage = (event) => {
            const parsedData = safeJsonParse<T>(event.data);
            if (parsedData != null) {
                callback(parsedData);
            }
        };

        ws.onclose = () => {
            console.log('Forbindelse til WebSocket lukket.');
        };

        ws.onerror = (error) => {
            console.error('WebSocket fejl:', error);
        };
    })

    onUnmounted(() => {
        ws?.close();
    });

    return {
        sendMessage: (message: T) => {
            const stringified = safeStringify(message);
            const blob = toBlob(stringified);
            ws?.send(blob);
        }
    }
}