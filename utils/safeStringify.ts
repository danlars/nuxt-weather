/**
 * En robust version af JSON.stringify, der håndterer cirkulære referencer, BigInts,
 * og andre typer, der normalt ville forårsage fejl eller datatab.
 *
 * @param value Den værdi, der skal konverteres til en JSON-streng.
 * @param space Tilføjer indrykning, mellemrum og linjeskift til output-strengen for at gøre den mere læsbar.
 * @returns En JSON-streng.
 */
export const safeStringify = (value: unknown, space?: string | number): string => {
    // WeakSet bruges til at holde styr på objekter, vi allerede har set.
    // WeakSet er ideel, da den ikke forhindrer garbage collection.
    const seen = new WeakSet();

    const replacer = (key: string, val: unknown) => {
        // Hvis værdien er null, er der ingen grund til at tjekke yderligere.
        if (val === null || typeof val !== 'object') {
            // Håndter BigInt ved at konvertere det til en streng.
            if (typeof val === 'bigint') {
                return val.toString() + 'n'; // Tilføj 'n' for at markere, at det var en BigInt
            }
            return val;
        }

        // Hvis vi har set dette objekt før, er det en cirkulær reference.
        if (seen.has(val)) {
            return '[Circular Reference]';
        }
        seen.add(val);

        // Håndter special-objekter, der normalt serialiseres dårligt.
        if (val instanceof Map) {
            return Array.from(val.entries()); // Konverter Map til et array af [key, value]-par
        }
        if (val instanceof Set) {
            return Array.from(val.values()); // Konverter Set til et array af værdier
        }
        if (val instanceof Error) {
            return {
                name: val.name,
                message: val.message,
                stack: val.stack
            };
        }

        // Håndter funktioner og undefined, som normalt ville blive fjernet.
        // Vi erstatter dem med en informativ streng.
        if (typeof val === 'function') {
            return `[Unsupported Type: Function]`;
        }
        if (typeof val === 'undefined') {
            return `[Unsupported Type: undefined]`;
        }

        return val;
    };

    // Kør den rigtige stringify med vores special-byggede replacer.
    // Pakket i en try...catch for absolut sikkerhed.
    try {
        return JSON.stringify(value, replacer, space);
    } catch (error) {
        // Skulle der opstå en uventet fejl, returneres en fejlbesked.
        if (error instanceof Error) {
            return JSON.stringify({
                error: "Failed to stringify object",
                message: error.message
            });
        }
        return '"[Stringify Error]"';
    }
}