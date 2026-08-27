import CustomError from "./customError.ts";

export class InvalidCreateBlogRequestError extends CustomError<ErrorType> { }

export class GetBlogRequestError extends CustomError<ErrorType> {}
