import express from "express";
import { createBook } from "./bookController.ts";
import multer from "multer";
import path from "node:path";

const bookRouter = express.Router();

// upload is a middleware
const upload = multer({
  dest: path.resolve(__dirname, "../../public/uploads"),
  limits: { fieldSize: 3e7 }, // 30MB
});

bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
