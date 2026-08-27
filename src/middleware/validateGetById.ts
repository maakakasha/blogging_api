import { type Request, type Response, type NextFunction } from "express";
import { GetBlogRequestError } from "../errors/invalidCreateBlogRequestError.ts";

export function validateGetByIdMiddleWare(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);

  if ((req.params.id === "" || !Number.isInteger(id) || id <= 0)) {
    throw new GetBlogRequestError({
      message: "Invalid id",
      statusCode: 400,
      code: "ERR_VAL",
    });
  }

  req.body = { id };

  next();
}
