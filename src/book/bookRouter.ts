import express from "express";
import {createBook, updateBook} from "./bookController.ts";
import multer from "multer";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { authenticate } from "../middleware/authenticate.ts";

const bookRouter = express.Router();

// upload is a middleware

const __dirname = dirname(fileURLToPath(import.meta.url));

const upload = multer({
  dest: path.resolve(__dirname, "../../public/uploads"),
  limits: { fileSize: 3e7 }, // 30MB
});

bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);






export default bookRouter;
