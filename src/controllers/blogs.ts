import { type Request, type Response } from "express";
import type { BlogOperationContract } from "../database/persistaece/blogOperationsContract.ts";
import { asyncErrorHandlingWrapper } from "../utils/asyncErrorHandlingWrapper.ts";

export class BlogController {
  private persistanceOps: BlogOperationContract;

  constructor(persistanceOps: BlogOperationContract) {
    this.persistanceOps = persistanceOps;
  }

  getAllBlogs = asyncErrorHandlingWrapper(
    async (req: Request, res: Response) => {
      const blogs = await this.persistanceOps.getAllBlogs();

      res.send(blogs);
    },
  );

  async getBlogById(req: Request, res: Response) {
    const blog = await this.persistanceOps.getBlogById(req.params.id);
    res.json(blog);
  }

  async createBlog(req: Request, res: Response) {
    // Happy path:
    // Ingest the database using ORM

    const blog = await this.persistanceOps.createBlog(req.body);
    res.status(201).json(blog);
  }

  async updateBlog(req: Request, res: Response) {
    await this.persistanceOps.updateBlog(req.params.id, req.body);
    res.sendStatus(204);
  }

  async deleteBlog(req: Request, res: Response) {
    await this.persistanceOps.deleteBlog(req.params.id);
    res.sendStatus(204);
  }
}
