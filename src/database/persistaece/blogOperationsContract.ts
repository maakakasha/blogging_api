import { type CreateBlogObject } from "../../types/createBlogObject.ts";

export abstract class BlogOperationContract {
  abstract createBlog(blog: CreateBlogObject): Promise<CreateBlogObject>;
  abstract getBlogById(id: number): Promise<CreateBlogObject | null>;
  abstract getAllBlogs(): Promise<CreateBlogObject[]>;
  abstract updateBlog(id: number, data: Partial<CreateBlogObject>): Promise<void>;
  abstract deleteBlog(id: number): Promise<void>;
  abstract fitlerBlogsBySearchTerm(term: string): Promise<CreateBlogObject[]>;
}
