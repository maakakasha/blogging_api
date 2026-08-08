import { Sequelize } from "sequelize";
import type { CreateBlog } from "../../types/createBlog.ts";
import { BlogOperationContract } from "../persistaece/blogOperationsContract.ts";

export default class BlogOperationsImpl extends BlogOperationContract {
  private db: Sequelize;

  constructor(db: Sequelize) {
    super();
    this.db = db;
  }

  createBlog(blog: CreateBlog): Promise<CreateBlog> {
    throw new Error("Method not implemented.");
  }

  getBlogById(id: number): Promise<CreateBlog | null> {
    throw new Error("Method not implemented.");
  }

  getAllBlogs(): Promise<CreateBlog[]> {
    throw new Error("Method not implemented.");
  }

  updateBlog(id: number, data: Partial<CreateBlog>): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteBlog(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  fitlerBlogsBySearchTerm(term: string): Promise<CreateBlog[]> {
    throw new Error("Method not implemented.");
  }
}
