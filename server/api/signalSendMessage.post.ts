import { WebPubSubServiceClient } from '@azure/web-pubsub';

export default defineEventHandler(async (event) => {
    // Hent forbindelsesstrengen fra miljøvariabler (mere om det i trin 4)
    const connectionString = process.env.AZURE_SIGNALR_CONNECTION_STRING;
    if (!connectionString) {
        throw createError({ statusCode: 500, statusMessage: 'SignalR Connection String is not configured.' });
    }

    // 'chat' er navnet på vores "hub" eller kanal. Du kan navngive den, hvad du vil.
    const hubName = 'chat';
    const serviceClient = new WebPubSubServiceClient(connectionString, hubName);

    // Læs beskeden fra request body
    const body = await readBody(event);
    const message = body.message || 'No message';
    const sender = body.sender || 'Anonymous';

    // Send beskeden til ALLE forbundne klienter
    // Vi sender et struktureret objekt med et event-navn ('newMessage')
    await serviceClient.sendToAll({
        event: 'newMessage', // Klienten skal lytte efter dette event
        data: {
            text: message,
            sender: sender,
            timestamp: new Date().toISOString()
        }
    });

    return { status: 'Message sent successfully!' };
});