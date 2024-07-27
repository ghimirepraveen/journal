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

    const extendedPrompt = `This is my daily journal i want a beautiful journal to save in a blog provide the response accordingly ${prompt}
    name=${req.user.name}`;

    const aiContent = await generateAIContent(extendedPrompt);

    res.status(200).json({ aiContent });
  }
);

//the response from above is passed as content to the below if the user wants to save the journal with the help of ai

export const addJournal = asyncCatch(async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new customError("Title and content are required", 400);
  }
  const user = req.user.id;

  const journal = new Journal({
    title,
    content,
    user: user,
    date: Date.now(),
  });
  await journal.save();

  res.status(201).json({ journal });
});

export const getJournals = asyncCatch(async (req: Request, res: Response) => {
  const journals = await Journal.find({ user: req.user._id });

  res.status(200).json({ journals });
});

export const getJournal = asyncCatch(async (req: Request, res: Response) => {
  const journal = await Journal.findOne({
    _id: req.params.id,

    user: req.user.id,
  });

  if (!journal) {
    throw new customError("Journal not found", 404);
  }

  res.status(200).json({ journal });
});

export const deleteJournal = asyncCatch(async (req: Request, res: Response) => {
  const journal = await Journal.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!journal) {
    throw new customError("Journal not found", 404);
  }

  res.status(200).json({ journal });
});
