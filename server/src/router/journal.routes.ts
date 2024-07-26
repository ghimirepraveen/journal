import Router from "express";
import { generateAndRespondAIContent } from "../controller/journal.controller";

import auth from "../middleware/auth";

const journalRouter = Router();

journalRouter.use(auth);

journalRouter.post("/add", generateAndRespondAIContent);

export default journalRouter;
