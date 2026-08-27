import { describe, expect, it, vi } from "vitest";
import { validateGetByIdMiddleWare } from "../../../src/middleware/validateGetById.ts";
import { GetBlogRequestError } from "../../../src/errors/invalidCreateBlogRequestError.ts";

describe("validateCreateBlog Middleware - Success", () => {
  it("sanitizes req.params and calls next() on valid input", () => {
    // Arrange the req params object
    const req = {
      params: {
        id: "1",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    const next = vi.fn();

    validateGetByIdMiddleWare(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();

    expect(req.body).toEqual({
      id: 1,
    });
  });

  it("throws on an invalid input", () => {
    const req = { params: { id: "myNameIsDi" } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    expect(() => validateGetByIdMiddleWare(req, res, next)).toThrow(
      GetBlogRequestError,
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("throws on an empty input", () => {
    const req = { params: { id: "" } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    expect(() => validateGetByIdMiddleWare(req, res, next)).toThrow(
      GetBlogRequestError,
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("throws on negative inputs", () => {
    const req = { params: { id: "-1" } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    expect(() => validateGetByIdMiddleWare(req, res, next)).toThrow(
      GetBlogRequestError,
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("throws on zero inputs", () => {
    const req = { params: { id: "0" } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    expect(() => validateGetByIdMiddleWare(req, res, next)).toThrow(
      GetBlogRequestError,
    );

    expect(next).not.toHaveBeenCalled();
  });
});
