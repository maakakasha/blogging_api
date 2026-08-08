import { describe , test, expect } from "vitest";
import { reqMock, resMock } from "../../__mocks__/index.ts";
import { getAllPosts, getPostById } from "../../src/controllers/blogs.ts";

describe("GET /posts", () => {
  test("Happy path: should return all posts", async () => {
    getAllPosts(reqMock, resMock);
    // Res.send to be called within the handler
    expect(resMock.send).toHaveBeenCalledWith([]);
  });
});

describe("GET /posts/:id", () => {
  test("Happy path: should return all posts", async () => {
    getPostById(reqMock, resMock);
    // Res.send to be called within the handler
    expect(resMock.json).toHaveBeenCalledWith({});
  });
});
