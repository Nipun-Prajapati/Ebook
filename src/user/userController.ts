import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "./userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {sign} = jwt ;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All field are required!");
    return next(error);
  }
  // Database call && find user

  const findUser = await User.findOne({ email: email });

  if (findUser) {
    const error = createHttpError(400, "User already exists with this email!");
    return next(error);
  }

  // Hash a password
  const hashedPassword = await bcrypt.hash(password, 10);

  // store a data in database

  const newUser = await User.create({ name, email, password: hashedPassword });

  // token generation from JWT

  const token = sign({ sub: newUser._id }, process.env.JWT_SECRET as string,{expiresIn : "7d"});

  

  res.json({ accessToken : token });

  
};

export { createUser };
