import { vi, describe, it, expect } from "vitest"; // or jest
import { validateCreateBlogMiddleWare } from "../../../src/middleware/validateCreateBlog.ts";
import { InvalidCreateBlogRequestError } from "../../../src/errors/invalidCreateBlogRequestError.ts";

describe("validateCreateBlog Middleware - Success", () => {
  it("sanitizes req.body and calls next() on valid input", () => {
    const req = {
      body: {
        title: "Valid Title",
        content: "Valid Content",
        category: "Medicine",
        tags: ["MRI, Cerebropathoma"],
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    const next = vi.fn();

    validateCreateBlogMiddleWare(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();

    expect(req.body).toEqual({
      title: "Valid Title",
      content: "Valid Content",
      category: "Medicine",
      tags: ["MRI, Cerebropathoma"],
    });
  });
});

describe("validateCreateBlog Middleware - Rejection", () => {
  it("rejects invalid input and calls next() with an error", () => {
    // Arrange
    const req = {
      body: {
        title: "Valid Title",
        content: "Valid Content",
        category: "Medicine",
        tags: [1],
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    const next = vi.fn();

    // Act
    validateCreateBlogMiddleWare(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledWith(
      new InvalidCreateBlogRequestError({
        message: "Invalid Input",
        statusCode: 400,
        code: "ERR_VAL",
      }),
    );
  });
});
