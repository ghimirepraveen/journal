import { Request, Response } from "express";
import asyncCatch from "../error/catchasyc";
import customError from "../error/custom.erorr";
import User from "../model/user.model";

export const register = asyncCatch(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new customError("email and password are required", 400);
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    throw new customError("user already exist", 400);
  }

  const user = await User.create({
    email: email,
    name: name,
    password: password,
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

  const user = User.findOne;
});
