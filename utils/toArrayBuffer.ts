async function toArrayBuffer(data: unknown): Promise<ArrayBuffer> {
    // 1. Hvis det allerede er en ArrayBuffer, returner den direkte.
    if (data instanceof ArrayBuffer) {
        return data;
    }

    if (typeof data === 'string') {
        const encoder = new TextEncoder();
        return encoder.encode(data).buffer as ArrayBuffer;
    }

    if (data instanceof Blob) {
        return await data.arrayBuffer();
    }

    if (typeof data === 'object' && data !== null && 'buffer' in data && data.buffer instanceof ArrayBuffer) {
        return data.buffer;
    }

    if (Array.isArray(data)) {
        // Antager her, at det er et array af bytes (0-255).
        const uint8Array = new Uint8Array(data);
        return uint8Array.buffer;
    }

    throw new Error('Input data type is not supported for ArrayBuffer conversion.');
}