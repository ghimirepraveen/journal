import { Request, Response } from "express";
import asyncCatch from "../error/catchasyc";
import customError from "../error/custom.erorr";
import Journal from "../model/journalmodel";
import { generateAIContent } from "../utils/generateAiContent";

export const generateAndRespondAIContent = asyncCatch(
  async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
      throw new customError("Prompt is required", 400);
    }
    const aiContent = await generateAIContent(prompt);

    res.status(200).json({ aiContent });
  }
);
