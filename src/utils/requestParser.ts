import { z } from "zod";

type ParseResult<T> =
  { success: true; data: T } | { success: false; error: string };

export function safeParseRequest<T>(
  schema: z.Schema<T>,
  body: unknown,
): ParseResult<T> {
  const result = schema.safeParse(body);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: "Invalid Input" };
}
