import mongoose from "mongoose";

const battleSchema = new mongoose.Schema(
  {
    topic: String,
    messages: Object,
    model1: String,
    model2: String,
    judge: String,
    rounds: Number,
    upVote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Battle = mongoose.model("Battle", battleSchema);
