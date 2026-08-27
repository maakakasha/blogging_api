import zod from "zod";

export const getByIDRequestSchema = zod.object({
  id: zod.number(),
});

export type GetByIdObject = zod.infer<typeof getByIDRequestSchema>;
