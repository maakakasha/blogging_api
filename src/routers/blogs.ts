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
import { validateCreateBlogMiddleWare } from "../middleware/validateCreateBlog.ts";

export function constructBlogRouter(
  persistanceOps: BlogOperationContract,
): Router {
  const blogRouter = Router();

  blogRouter.get(
    "/blogs",
    async (req: Request, res: Response, next: NextFunction) => {
      const blogs = await persistanceOps.getAllBlogs();

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

  blogRouter.delete(
    "/blogs/:id",
    validateGetByIdMiddleWare,
    async (req: Request<{ id: string }>, res: Response) => {
      try {
        await persistanceOps.deleteBlog(Number(req.params.id));
      } catch (e) {
        throw new GetBlogRequestError({
          message: "Blog not found",
          statusCode: 404,
          code: "ERR_NF",
        });
      }

      res.send();
    },
  );

  blogRouter.patch(
    "/blogs/:id",
    validateGetByIdMiddleWare,
    async (req: Request<{ id: string }>, res: Response) => {
      try {
        await persistanceOps.updateBlog(Number(req.params.id), req.body);
      } catch (e) {
        throw new GetBlogRequestError({
          message: "Blog not found",
          statusCode: 404,
          code: "ERR_NF",
        });
      }

      res.send();
    },
  );

  blogRouter.get(
    "/blogs/search/:term",
    async (req: Request<{ term: string }>, res: Response) => {
      const blogs = await persistanceOps.fitlerBlogsBySearchTerm(
        req.params.term,
      );

      res.send(blogs);
    },
  );

  blogRouter.post(
    "/blogs/create",
    validateCreateBlogMiddleWare,
    async (req: Request, res: Response) => {
      const blog = await persistanceOps.createBlog(req.body);

      res.send(blog);
    },
  );

  return blogRouter;
}

export default constructBlogRouter;
