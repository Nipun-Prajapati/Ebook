import jwt from "jsonwebtoken";
import type { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";

const { verify } = jwt;

export interface authRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return next(createHttpError(401, "Authorization token is required!"));
  }

  const parseToken = token.split(" ")[1];

  try {
    const decoded = verify(
      parseToken as string,
      process.env.JWT_SECRET as string
    );

    const _req = req as authRequest;

    _req.userId = decoded.sub as string;
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Authorization token is required!"));
  }

  next();
};

export { authenticate };
