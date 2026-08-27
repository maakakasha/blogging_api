import { it, describe, vi, expect } from "vitest";
import { type Request, type Response, type NextFunction } from "express";
import { BlogController } from "../../../src/controllers/blogs.ts";
import BlogORMOperationsImpl from "../../../src/database/ORM/BlogOperationImpl.ts";
import initialiseSequelize from "../../../src/database/ORM/tables/initSequelize.ts";
import { type CreateBlogObject } from "../../../src/types/createBlogObject.ts";

const sequelize = await initialiseSequelize();
const blogController = new BlogController(new BlogORMOperationsImpl(sequelize));

describe("Create blog handler", () => {
  const req = {
    body: {
      title: "",
      content: "",
      category: "",
      tags: [],
    } as CreateBlogObject,
  } as Request;
  const res = { status: vi.fn, json: vi.fn } as unknown as Response;

  blogController.createBlog(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
});
