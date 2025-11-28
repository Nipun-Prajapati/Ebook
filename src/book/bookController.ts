import type { NextFunction, Response, Request } from "express";

const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "book controoler" });
};

export { createBook };
