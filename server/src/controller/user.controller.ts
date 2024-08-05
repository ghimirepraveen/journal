import { Request, Response } from "express";
import asyncCatch from "../error/catchasyc";
import customError from "../error/custom.erorr";
import { sendResetPasswordEmail } from "../utils/sendemail";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

export const register = asyncCatch(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new customError("Name, email, and password are required", 400);
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new customError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  const userData = {
    _id: user._id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res.status(201).json(userData);
});

export const login = asyncCatch(async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customError("Email and password are required", 400);
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new customError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new customError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  const sanitizedUser = {
    _id: user._id,
    email: user.email,
    name: user.name,
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

export const changePassword = asyncCatch(
  async (req: Request, res: Response) => {
    console.log(req.user);

    const userId = req.user?.id as string;

    const user = await User.findById(userId);

    if (!user) {
      throw new customError("user not found", 404);
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new customError("oldPassword and newPassword are required", 400);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new customError("invalid old password", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "password changed" });
  }
);

export const forgetPassword = asyncCatch(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(email);

    if (!email) {
      throw new customError("Email is required", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new customError("User not found", 404);
    }

    const token = jwt.sign(
      { userId: user.id },

      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );

    await sendResetPasswordEmail(email, token);

    res.status(200).json({ message: "Email sent" });
  }
);

export const resetPassword = asyncCatch(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword, verifiedPassword } = req.body;
  console.log(token);

  if (!newPassword || !verifiedPassword) {
    throw new customError(
      "New password and verified password are required",
      400
    );
  }

  if (newPassword !== verifiedPassword) {
    throw new customError("Passwords do not match", 400);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    throw new customError("Invalid or expired token", 401);
  }
  console.log(decodedToken);
  const userId = (decodedToken as any).userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new customError("User not found", 404);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});

//TODO
//USer profile WIth date in it
