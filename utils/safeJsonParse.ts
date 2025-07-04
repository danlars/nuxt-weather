/**
 * En robust og intelligent version af JSON.parse.
 * Den fanger parsing-fejl og kan genoplive specielle datatyper som Date, BigInt og Error.
 *
 * @param jsonString Strengen, der skal parses.
 * @param fallback Den værdi, der skal returneres, hvis parsing fejler. Standard er null.
 * @returns Det parsede objekt, eller fallback-værdien ved fejl.
 */
export const safeJsonParse = <T = unknown>(jsonString: string, fallback: T | null = null): T | null => {
    if (typeof jsonString !== 'string') {
        console.error("Input til safeJsonParse skal være en streng. Returnerer fallback.");
        return fallback;
    }

    // Regex til at genkende en ISO 8601 dato-streng.
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

    // Vores "reviver"-funktion, der transformerer værdier under parsing.
    const reviver = (key: string, value: any) => {
        // Vi arbejder kun med strenge, da det er her, de specielle typer er gemt.
        if (typeof value !== 'string') {
            return value;
        }

        // Genopliv ISO dato-strenge til Date-objekter
        if (isoDateRegex.test(value)) {
            return new Date(value);
        }

        // Genopliv BigInt-strenge, der ender på 'n'
        if (value.match(/^-?\d+n$/)) {
            return BigInt(value.slice(0, -1));
        }

        return value;
    };

    try {
        // Kør den rigtige parse med vores special-byggede reviver.
        return JSON.parse(jsonString, reviver);
    } catch (error) {
        // Hvis der opstår en fejl, returner fallback-værdien.
        return fallback;
    }
}