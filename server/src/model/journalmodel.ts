import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./user.model";

const journalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
