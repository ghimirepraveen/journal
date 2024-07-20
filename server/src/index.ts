import express from "express";
import dotenv from "dotenv";
import connectDB from "./model/db";

import User from "./model/user.model";
import Journal from "./model/journalmodel";

dotenv.config();
const app = express();

(async () => {
  await connectDB();
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
