import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "./userModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All field are required!");
    return next(error);
  }
  // Database call && find user

  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const error = createHttpError(
        400,
        "User already exists with this email!"
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user."));
  }

  // Hash a password && store a data in database && token generation from JWT
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = sign({ sub: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user!"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = createHttpError(400, "All fields are required!");
    return next(error);
  }

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      const error = createHttpError(400, "User not found !");
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      const error = createHttpError(
        400,
        "User name and Password are incorrect!"
      );
      return next(error);
    }

    const token = sign(
      { sub: checkUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(400, "Error in logged in!"));
  }
};

export { createUser, loginUser };
