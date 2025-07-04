// export const useWebsocket = <T = unknown>(callback: (data: T) => void, path: string = 'chat') => {
//     let ws: WebSocket | null = null;
//
//     onMounted(() => {
//         const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
//         ws = new WebSocket(`${protocol}://${window.location.host}/api/${path}`);
//
//         ws.onopen = () => {
//             console.log('Forbundet til WebSocket server!');
//         };
//
//         ws.onmessage = (event) => {
//             const parsedData = safeJsonParse<T>(event.data);
//             if (parsedData != null) {
//                 callback(parsedData);
//             }
//         };
//
//         ws.onclose = () => {
//             console.log('Forbindelse til WebSocket lukket.');
//         };
//
//         ws.onerror = (error) => {
//             console.error('WebSocket fejl:', error);
//         };
//     })
//
//     onUnmounted(() => {
//         ws?.close();
//     });
//
//     return {
//         sendMessage: (message: T) => {
//             const stringified = safeStringify(message);
//             const blob = toBlob(stringified);
//             ws?.send(blob);
//         }
//     }
// }

import * as signalR from '@microsoft/signalr';


export const useWebsocket = <T = unknown>(callback: (data: T) => void, path: string = 'chat') => {
    const isProduction = import.meta.env.PROD;
    let ws: WebSocket | null = null;
    let connection: signalR.HubConnection | null = null;

    onMounted(() => {
        if (isProduction) {
            connection = new signalR.HubConnectionBuilder()
                .withUrl('/api')
                .withAutomaticReconnect()
                .build();
            connection.on('newMessage', (message: T) => {
                callback(message);
            });

            connection.start()
                .then(() => console.log('Forbundet til Azure SignalR!'))
                .catch(err => console.error('SignalR Forbindelsesfejl:', err));
        } else {
            const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
            ws = new WebSocket(`${protocol}://${window.location.host}/api/${path}`);

            ws.onopen = () => {
                console.log('Forbundet til lokal WebSocket server!');
            };

            ws.onmessage = (event) => {
                const parsedData = safeJsonParse<{ data: T }>(event.data);
                if (parsedData != null) {
                    callback(parsedData.data);
                }
            };

            ws.onclose = () => {
                console.log('Forbindelse til lokal WebSocket lukket.');
            };

            ws.onerror = (error) => {
                console.error('Lokal WebSocket fejl:', error);
            };
        }
    });

    onUnmounted(() => {
        if (isProduction) {
            connection?.stop();
        } else {
            ws?.close();
        }
    });

    return {
        sendMessage: (message: T) => {
            if (isProduction) {
                $fetch('/api/signalSendMessage', {
                    method: 'POST',
                    body: { message }
                }).catch(err => console.error('Fejl ved afsendelse af SignalR-besked:', err));
            } else {
                const stringified = safeStringify(message);
                const blob = toBlob(stringified);
                ws?.send(blob);
            }
        }
    };
};