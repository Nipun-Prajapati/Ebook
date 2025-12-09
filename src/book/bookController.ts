import type { Request, Response, NextFunction } from "express";
import path from "node:path";
import cloudinary from "../config/Cloudinary.ts";
import { fileURLToPath } from "node:url";
import createHttpError from "http-errors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Book from "./bookModel.ts";
import fs from "node:fs";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    // This is for Image.
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage?.[0]?.mimetype
      .split("/")
      .at(-1);
    const coverFileName = files.coverImage?.[0]?.filename;
    const coverFilePath = path.resolve(
      __dirname,
      "../../public/uploads",
      coverFileName as string
    );

    const bookCoverUploadResult = await cloudinary.uploader.upload(
      coverFilePath,
      {
        filename_override: coverFileName as string,
        folder: "book-covers",
        format: coverImageMimeType as string,
      }
    );

    // This is for PDF.
    const bookFileName = files.file?.[0]?.filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/uploads",
      bookFileName as string
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName as string,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    //Sotre a book data in database.
    const newBook = await Book.create({
      title,
      genre,
      author: "6938109154c9647970c40a0d0",
      coverImage: bookCoverUploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    //Delete a temporary files from upload folder.
    await fs.promises.unlink(coverFilePath);
    await fs.promises.unlink(bookFilePath);

    res.json({ id : newBook._id });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading a book."));
  }
};

export { createBook };
