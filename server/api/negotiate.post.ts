import { WebPubSubServiceClient } from '@azure/web-pubsub';

export default defineEventHandler(async (event) => {
    const connectionString = process.env.AZURE_SIGNALR_CONNECTION_STRING;
    if (!connectionString) {
        throw createError({ statusCode: 500, statusMessage: 'SignalR Connection String not configured.' });
    }

    const hubName = 'chat';
    const serviceClient = new WebPubSubServiceClient(connectionString, hubName);

    const token = await serviceClient.getClientAccessToken({
        roles: ['webpubsub.joinLeaveGroup.chat', 'webpubsub.sendToGroup.chat']
    });

    // Returner den fulde URL og token til klienten
    return {
        url: token.url,
        accessToken: token.token
    };
});