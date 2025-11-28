import type { NextFunction, Response, Request } from "express";

//file send in multipart form-data 
// use a library called multer

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "book controoler" });
};

export { createBook };
