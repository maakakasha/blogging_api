import { Sequelize } from "sequelize";

import {
  expect,
  it,
  describe,
  vi,
  beforeEach,
  type Mock,
  afterEach,
} from "vitest";
import BlogORMOperationsImpl from "../../../src/database/ORM/BlogOperationImpl.ts";
import type { CreateBlogObject } from "../../../src/types/createBlogObject.ts";
import DatabaseError from "../../../src/errors/databaseError.ts";
import initialiseSequelize from "../../../src/database/ORM/tables/initSequelize.ts";

vi.mock("./tables/blog.ts");

describe("BlogORMOperationsImpl.createBlog", () => {
  let impl: BlogORMOperationsImpl;

  const blogInput: CreateBlogObject = {
    // id: 1,
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  } as CreateBlogObject;

  beforeEach(async () => {
    const sequelize: Sequelize = await initialiseSequelize();
    impl = new BlogORMOperationsImpl(sequelize);
    vi.clearAllMocks();
  });

  it("returns the created blog on success", async () => {
    const createdBlog = { ...blogInput };

    const result = await impl.createBlog(blogInput);

    expect(result.title).toBe(createdBlog.title);
    expect(result.content).toBe(createdBlog.content);
    expect(result.category).toBe(createdBlog.category);
    expect(result.tags).toEqual(createdBlog.tags);
  });
});

describe("BlogORMOperationsImpl.getByID", () => {
  let impl: BlogORMOperationsImpl;

  const blogInput: CreateBlogObject = {
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  } as CreateBlogObject;

  beforeEach(async () => {
    const sequelize: Sequelize = await initialiseSequelize();
    impl = new BlogORMOperationsImpl(sequelize);
    vi.clearAllMocks();

    await impl.createBlog(blogInput);
  });

  it("returns the Blog by its ID", async () => {
    const createdBlog = { ...blogInput };

    const result = await impl.getBlogById(1);

    expect(result!.title).toBe(createdBlog.title);
    expect(result!.content).toBe(createdBlog.content);
    expect(result!.category).toBe(createdBlog.category);
    expect(result!.tags).toEqual(createdBlog.tags);
  });

  it("throws DatabaseError when BlogTable.getByID rejects", async () => {
    await expect(impl.getBlogById(2)).rejects.toThrow(DatabaseError);
  });

  it("throws if the element was not found", async () => {
    await expect(impl.getBlogById(11)).rejects.toThrow();
  });
});

describe("BlogORMOperationsImpl.getAll", () => {
  let impl: BlogORMOperationsImpl;

  const blogInput1: CreateBlogObject = {
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  } as CreateBlogObject;

  const blogInput2: CreateBlogObject = {
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  } as CreateBlogObject;

  const blogInput3: CreateBlogObject = {
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  } as CreateBlogObject;

  beforeEach(async () => {
    const sequelize: Sequelize = await initialiseSequelize();
    impl = new BlogORMOperationsImpl(sequelize);
    vi.clearAllMocks();

    await impl.createBlog(blogInput1);
    await impl.createBlog(blogInput2);
    await impl.createBlog(blogInput3);
  });

  it("returns the all Blogs", async () => {
    const result = await impl.getAllBlogs();

    const count = result.length;

    expect(count).toBe(3);
  });
});

describe("BlogORMOperationsImpl.update", () => {
  let impl: BlogORMOperationsImpl;

  const blogInput1: CreateBlogObject = {
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  } as CreateBlogObject;

  const blogInput2: CreateBlogObject = {
    title: "New Title",
    tags: ["Neurology", "Myeline sheeth, Opthomaolgy"],
  } as CreateBlogObject;

  beforeEach(async () => {
    const sequelize: Sequelize = await initialiseSequelize();
    impl = new BlogORMOperationsImpl(sequelize);
    vi.clearAllMocks();

    await impl.createBlog(blogInput1);
  });

  it("updates a single blog by its ID", async () => {
    await impl.updateBlog(1, blogInput2);

    const result = await impl.getBlogById(1);

    expect(result!.title).toBe("New Title");
    expect(result!.tags).toEqual(blogInput2.tags);
  });
});

describe("BlogORMOperationsImpl.delete", () => {
  let impl: BlogORMOperationsImpl;
  let sequelize: Sequelize;

  const validBlogInput: CreateBlogObject = {
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  };

  beforeEach(async () => {
    // 1. Properly isolate the database state between tests
    sequelize = await initialiseSequelize();
    await sequelize.sync({ force: true });

    impl = new BlogORMOperationsImpl(sequelize);
    vi.clearAllMocks();
  });

  afterEach(async () => {
    // 2. Clean up the database connection
    await sequelize.close();
  });

  it("should permanently delete a blog when given a valid ID", async () => {
    // Arrange: Create a blog and capture its generated ID dynamically
    const createdBlog = await impl.createBlog(validBlogInput);
    const blogId = createdBlog.id;

    // Act: Perform the deletion
    await impl.deleteBlog(blogId);

    // Assert: Verify the blog no longer exists
    await expect(impl.getBlogById(blogId)).rejects.toThrow();
  });
});

describe("BlogORMOperationsImpl.filterBySearchTerm", () => {
  let impl: BlogORMOperationsImpl;
  let sequelize: Sequelize;

  const validBlogInput: CreateBlogObject = {
    title: "Test Blog",
    content: "Test content",
    category: "Medicine",
    tags: ["Neurology", "Myeline sheeth"],
  };

  beforeEach(async () => {
    // 1. Properly isolate the database state between tests
    sequelize = await initialiseSequelize();
    await sequelize.sync({ force: true });

    impl = new BlogORMOperationsImpl(sequelize);
    vi.clearAllMocks();
  });

  afterEach(async () => {
    // 2. Clean up the database connection
    await sequelize.close();
  });

  it("should permanently delete a blog when given a valid ID", async () => {
    // Arrange: Create a blog and capture its generated ID dynamically
    const createdBlog = await impl.createBlog(validBlogInput);
    const blogId = createdBlog.id;

    // Act: filterBySearchTerm
    const results = await impl.fitlerBlogsBySearchTerm("bl");

    // Assert: Verifies all candidates returned
    expect(results).toEqual([createdBlog]);
  });
});
