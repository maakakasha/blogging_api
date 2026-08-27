import { Op, Sequelize } from "sequelize";
import type { CreateBlogObject } from "../../types/createBlogObject.ts";
import { BlogOperationContract } from "../persistaece/blogOperationsContract.ts";
import { BlogTable } from "./tables/blog.ts";
import DatabaseError from "../../errors/databaseError.ts";
import { initBlogTable } from "./tables/blog.ts";

export default class BlogORMOperationsImpl extends BlogOperationContract {
  private db: Sequelize;

  constructor(db: Sequelize) {
    super();
    this.db = db;
  }

  async createBlog(blog: CreateBlogObject): Promise<CreateBlogObject> {
    try {
      const created = await BlogTable.create(blog);
      return created.toJSON();
    } catch (error) {
      throw new DatabaseError(`${error}`);
    }
  }

  async getBlogById(id: number): Promise<CreateBlogObject | null> {
    try {
      const post = await BlogTable.findByPk(id);

      if (post === null) {
        throw new DatabaseError(`Record not found for id: ${id}`);
      }

      return post!.toJSON();
    } catch (error) {
      throw new DatabaseError(`${error}`);
    }
  }

  async getAllBlogs(): Promise<CreateBlogObject[]> {
    try {
      const posts = await BlogTable.findAll();
      return posts.map((post) => {
        return post.toJSON();
      });
    } catch (error) {
      throw new DatabaseError(`${error}`);
    }
  }

  async updateBlog(id: number, data: Partial<CreateBlogObject>): Promise<void> {
    try {
      await BlogTable.update(data, { where: { id: id } });
    } catch (error) {
      throw new DatabaseError(`${error}`);
    }
  }

  async deleteBlog(id: number): Promise<void> {
    try {
      await BlogTable.destroy({ where: { id } });
    } catch (error) {
      throw new DatabaseError(`${error}`);
    }
  }

  async fitlerBlogsBySearchTerm(term: string): Promise<CreateBlogObject[]> {
    try {
      const results = await BlogTable.findAll({
        where: {
          title: {
            [Op.like]: `%${term}%`, // Case-sensitive on some DBs, use Op.iLike for Postgres case-insensitive
          },
        },
      });

      return results.map((e) => {
        return e.toJSON();
      });
    } catch (error) {
      throw new DatabaseError(`${error}`);
    }
  }
}
