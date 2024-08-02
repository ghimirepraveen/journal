import express from "express";
import dotenv from "dotenv";
import connectDB from "./model/db";

import User from "./model/user.model";
import Journal from "./model/journalmodel";
import userRouter from "./router/user.routes";
import errorHandler from "./controller/error.controller";
import journalRouter from "./router/journal.routes";
import cors from "cors";
import cookieparser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieparser());
app.use(helmet());
app.use(morgan("dev"));

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
