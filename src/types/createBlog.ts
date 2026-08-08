import zod from "zod";

export const createRequestSchema = zod.object({
  title: zod.string(),
  content: zod.string(),
  category: zod.string(),
  tags: zod.array(zod.string()),
});


export type CreateBlog = zod.infer<typeof createRequestSchema>;
