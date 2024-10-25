import express from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";

const router = express.Router();

//post comment to a Specific recipe
router.post("/recipe/:recipeId", async (req, res) => {
  const { text, author } = req.body;
  const { recipeId } = req.params;

  // Check if the recipeId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ message: "Invalid recipe ID" });
  }

  const newComment = new Comment({
    text,
    author,
    recipe: recipeId,
  });
  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: "Error posting comment", error });
  }
});

// Get all comments for a specific recipe: recipeId
router.get("/recipe/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipe: recipeId }).populate(
      "recipe"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("recipe");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

export default router;
