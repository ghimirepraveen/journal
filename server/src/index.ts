import express from "express";
import dotenv from "dotenv";
import connectDB from "./model/db";

import User from "./model/user.model";
import Journal from "./model/journalmodel";
import userRouter from "./router/user.routes";
import errorHandler from "./controller/error.controller";
import journalRouter from "./router/journal.routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await connectDB();
})();

app.use("/api/user", userRouter);
app.use("/api/journal", journalRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
