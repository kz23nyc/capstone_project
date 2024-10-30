import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true
    },
    author: {
      type: String,
      default: "Anonymous"
    },
  },
  { timestamps: true }
);

// Index for associating comments with recipes to improve performance on comment retrieval per recipe
commentSchema.index({ recipe: 1 });

export default mongoose.model("Comment", commentSchema);
