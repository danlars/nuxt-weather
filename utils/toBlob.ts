export const toBlob = (data: unknown, mimeType: string = 'application/octet-stream'): Blob => {
    // 1. Hvis det allerede er en Blob, returner den direkte.
    if (data instanceof Blob) {
        return data;
    }

    // 2. Hvis det er en streng.
    if (typeof data === 'string') {
        return new Blob([data], { type: mimeType });
    }

    // 3. Hvis det er en ArrayBuffer eller en TypedArray (f.eks. Uint8Array).
    // ArrayBuffer.isView() tjekker for alle former for TypedArrays.
    if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
        return new Blob([data], { type: mimeType });
    }

    // 4. Hvis det er et almindeligt array af tal (bytes).
    if (Array.isArray(data)) {
        const uint8Array = new Uint8Array(data);
        return new Blob([uint8Array], { type: mimeType });
    }

    // 5. Hvis det er et objekt, konverter det til en JSON-streng.
    // Her tilsidesætter vi MIME-typen til 'application/json', da det er det mest logiske format.
    if (typeof data === 'object' && data !== null) {
        try {
            const jsonString = JSON.stringify(data);
            return new Blob([jsonString], { type: 'application/json' });
        } catch (error) {
            throw new Error('Objektet kunne ikke konverteres til JSON.');
        }
    }

    // 6. Hvis input-typen ikke understøttes, kast en fejl.
    throw new Error('Input data type is not supported for Blob conversion.');
}
