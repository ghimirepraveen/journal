import { Request, Response } from "express";
import asyncCatch from "../error/catchasyc";
import customError from "../error/custom.erorr";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = asyncCatch(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new customError("email and password are required", 400);
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    throw new customError("user already exist", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });
  const {
    password: _,
    id: undefined,
    createdAt,
    updatedAt,
    ...userdata
  } = user;
  console.log(userdata);

  res.status(201).json(userdata);
});

export const login = asyncCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError("email and password are required", 400);
  }

  const user = User.findOne({ email: email });

  if (!user) throw new customError("email and password are required", 400);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new customError("invalid credentials", 401);

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );
  let sanitizedUser = {
    ...user,
    id: undefined,
    password: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };

  res
    .status(200)
    .cookie(
      process.env.COOKIES_NAME as string,
      JSON.stringify({ token, user: sanitizedUser }),
      {
        path: "/",
        secure: false,
        maxAge: 86400,
      }
    )

    .json({
      user: sanitizedUser,
      token,
    });
});
