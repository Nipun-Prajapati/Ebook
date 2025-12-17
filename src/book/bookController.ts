import { type Request, type Response, type NextFunction } from "express";
import path from "node:path";
import cloudinary from "../config/Cloudinary.ts";
import { fileURLToPath } from "node:url";
import createHttpError from "http-errors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Book from "./bookModel.ts";
import fs from "node:fs";
import type { authRequest } from "../middleware/authenticate.ts";

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
    const _req = req as authRequest;
    const newBook = await Book.create({
      title,
      genre,
      author: _req.userId,
      coverImage: bookCoverUploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    //Delete a temporary files from upload folder.
    await fs.promises.unlink(coverFilePath);
    await fs.promises.unlink(bookFilePath);

    res.json({ id: newBook._id });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading a book."));
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    const bookId = req.params.bookId;

    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      return next(createHttpError(404, "Book not found."));
    }

    const _req = req as authRequest;
    if (book.author.toString() !== _req.userId) {
      return next(createHttpError(403, "You can't update others book."));
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let completeCoverImage = "";
    if (files.coverImage) {
      const filename = files.coverImage[0]?.filename;
      const coverImageMimeType = files.coverImage[0]?.mimetype
        .split("/")
        .at(-1);

      const filepath = path.resolve(
        __dirname,
        "../../public/uploads",
        filename
      );

      completeCoverImage = filename; // xyz.png

      const updateCover = await cloudinary.uploader.upload(filepath as string, {
        filename_override: completeCoverImage,
        folder: "book-covers",
        format: coverImageMimeType as string,
      });

      completeCoverImage = updateCover.secure_url;
      await fs.promises.unlink(filepath);
    }

    let completeFileName = "";
    if (files.file) {
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/uploads",
        files.file[0]?.filename as string
      );

      const bookFileName = files.file[0]?.filename;
      completeFileName = bookFileName;
      console.log(completeFileName);

      const updateFile = await cloudinary.uploader.upload(
        bookFilePath as string,
        {
          resource_type: "raw",
          filename_override: completeFileName,
          folder: "book-pdfs",
          format: "pdf",
        }
      );

      completeFileName = updateFile.secure_url;
      await fs.promises.unlink(bookFilePath);
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        title: title,
        genre: genre,
        coverImage: completeCoverImage || book.coverImage,
        file: completeFileName || book.file,
      },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "Error while updating book."));
  }
};

export { createBook, updateBook };
