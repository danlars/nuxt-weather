import type {Peer} from "crossws";

const peers = new Set<Peer>();
export default defineWebSocketHandler({
    open(peer) {
        peers.add(peer);
        // console.log("[ws] open", peer);
    },

    message(peer, message) {
        // console.log("[ws] message", peer, message);
        const data = message.text();
        for (const otherPeer of peers) {
            if (otherPeer !== peer) {
                otherPeer.send(data);
            }
        }
    },

    close(peer, event) {
        console.log("[ws] close", peer, event);
        peers.delete(peer);
    },

    error(peer, error) {
        console.log("[ws] error", peer, error);
    },
});