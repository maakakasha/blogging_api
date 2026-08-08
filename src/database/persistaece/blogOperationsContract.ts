import { type CreateBlog } from "../../types/createBlog.ts";

export abstract class BlogOperationContract {
  abstract createBlog(blog: CreateBlog): Promise<CreateBlog>;
  abstract getBlogById(id: number): Promise<CreateBlog | null>;
  abstract getAllBlogs(): Promise<CreateBlog[]>;
  abstract updateBlog(id: number, data: Partial<CreateBlog>): Promise<void>;
  abstract deleteBlog(id: number): Promise<void>;
  abstract fitlerBlogsBySearchTerm(term: string): Promise<CreateBlog[]>;
}
