import CustomError from "./customError.ts";

export default class DatabaseError extends CustomError<ErrorType> {
  constructor(message: string, error?: Error) {
    super({
      code: "ERR_DB",
      message,
      statusCode: 500,
    });
  }
}
