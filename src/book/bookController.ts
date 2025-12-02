import { type NextFunction, type Response, type Request } from "express";
import cloudinary from "../config/Cloudinary.ts";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import createHttpError from "http-errors";
import Book from "./bookModel.ts";
import fs from "node:fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

// files{coverImage :{[]},files : {[]}}
// Define file type for Multer

interface MulterRequest extends Request {
  //Allows req.files to be correctly typed when using Multe
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
  // give a type
}

export const createBook = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, genre } = req.body;
    console.log("userId :",req.userId);
    
    const coverFile = req.files?.coverImage?.[0];
    // file type
    const imagefileExt = coverFile?.mimetype.split("/").at(-1);
    const fileName = coverFile?.filename; // multer generates filename
    const filePath = path.resolve(
      __dirname,
      "../../public/uploads",
      fileName as string
    );

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName as string,
      folder: "book-covers",
      format: imagefileExt as string,
    });

    const bookFile = req.files?.file?.[0];
    const bookFileName = bookFile?.filename;
    const bookFilepath = path.resolve(
      __dirname,
      "../../public/uploads",
      bookFileName as string
    );

    const fileUploadResult = await cloudinary.uploader.upload(bookFilepath, {
      resource_type: "raw",
      filename_override: bookFileName as string,
      folder: "book-pdfs",
      format: "pdf",
    });

    console.log("Image :", uploadResult);
    console.log("pdf :", fileUploadResult);

    const newBook = await Book.create({
      title,
      author: "6927f8dc13f77d0e66f83a4f",
      coverImage: uploadResult.secure_url,
      file: fileUploadResult.secure_url,
      genre,
    });

    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilepath)

    return res.json({id : newBook._id });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading a file."));
  }
};
