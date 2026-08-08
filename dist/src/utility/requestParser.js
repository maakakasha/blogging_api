import { z } from "zod";
function safeParseRequest(schema, body) {
    const result = schema.safeParse(body);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error.message };
}
//# sourceMappingURL=requestParser.js.map