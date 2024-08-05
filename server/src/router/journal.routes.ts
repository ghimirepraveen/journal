import Router from "express";
import {
  generateAndRespondAIContent,
  addJournal,
  getJournal,
  getJournals,
  deleteJournal,
} from "../controller/journal.controller";

import auth from "../middleware/auth";

const journalRouter = Router();

journalRouter.use(auth);

journalRouter.post("/addai", generateAndRespondAIContent);
journalRouter.post("/add", addJournal);

//this is not working
journalRouter.get("/get", getJournals);

journalRouter.get("/getbyid/:id", getJournal);
journalRouter.delete("/delete/:id", deleteJournal);

export default journalRouter;
