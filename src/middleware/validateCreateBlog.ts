import { type Request, type Response, type NextFunction } from "express";
import { safeParseRequest } from "../utils/requestParser.ts";
import { type CreateBlogObject, createRequestSchema } from "../types/createBlogObject.ts";
import { InvalidCreateBlogRequestError } from "../errors/invalidCreateBlogRequestError.ts";

export function validateCreateBlogMiddleWare(
  req: Request<{}, {}, CreateBlogObject>,
  res: Response,
  next: NextFunction,
) {
  const parsedReq = safeParseRequest<CreateBlogObject>(createRequestSchema, req.body);

  if (parsedReq.success) {
    req.body = parsedReq.data;
  }

  if (!parsedReq.success) {
    parsedReq.error;
    next(
      new InvalidCreateBlogRequestError({
        message: "Invalid Input",
        statusCode: 400,
        code: "ERR_VAL",
      }),
    );
    return;
  }

  next();
}
