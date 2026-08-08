import { Router } from "express";
import { BlogController } from "../controllers/blogs.ts";
import { validateCreateBlogMiddleWare as validateCreateBlogMiddleWare } from "../middleware/validateCreateBlog.ts";

export function createBlogRouter(blogController: BlogController): Router {
  const blogRouter = Router();

  blogRouter.post(
    "/create-blog",
    validateCreateBlogMiddleWare,
    blogController.createBlog,
  );

  return blogRouter;
}

export default createBlogRouter;
