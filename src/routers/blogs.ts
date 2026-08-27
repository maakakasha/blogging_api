import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { BlogController } from "../controllers/blogs.ts";
import type { BlogOperationContract } from "../database/persistaece/blogOperationsContract.ts";
import { validateGetByIdMiddleWare } from "../middleware/validateGetById.ts";
import { GetBlogRequestError } from "../errors/invalidCreateBlogRequestError.ts";

export function constructBlogRouter(
  persistanceOps: BlogOperationContract,
): Router {
  const blogRouter = Router();

  blogRouter.get(
    "/blogs",
    async (req: Request, res: Response, next: NextFunction) => {
      const blogs = await persistanceOps.getAllBlogs();

      if (!blogs) {
        throw new GetBlogRequestError({
          message: "No blogs found",
          statusCode: 404,
          code: "ERR_NF",
        });
      }

      res.send(blogs);
    },
  );

  blogRouter.get(
    "/blogs/:id",
    validateGetByIdMiddleWare,
    async (req: Request<{ id: string }>, res: Response) => {
      const blog = await persistanceOps.getBlogById(Number(req.params.id));

      if (!blog) {
        throw new GetBlogRequestError({
          message: "Blog not found",
          statusCode: 404,
          code: "ERR_NF",
        });
      }

      res.send(blog);
    },
  );

  return blogRouter;
}

export default constructBlogRouter;
