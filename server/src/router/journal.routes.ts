import Router from "express";
import { generateAndRespondAIContent } from "../controller/journal.controller";

import auth from "../middleware/auth";

const journalRouter = Router();

journalRouter.use(auth);

journalRouter.post("/addai", generateAndRespondAIContent);
journalRouter.post("/add");

export default journalRouter;
