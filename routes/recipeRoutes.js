import express from "express";
import Recipe from "../models/Recipe.js";
import { getCategoryIdsFromNames } from "../utils/helpers.js";

const router = express.Router();

//Creating a New recipe
router.post("/", async (req, res) => {
  try {
    const categoryIds = await getCategoryIdsFromNames(req.body.categories);
    const newRecipeData = {
      ...req.body,
      categories: categoryIds, // Replace names with their corresponding ObjectIds
    };

    const recipe = new Recipe(newRecipeData);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error(`Error creating new recipe: ${error}`);
    res.status(400).json({ message: "Error creating new recipe", error: error.toString() });
  }
});

// Retrieving All recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("categories");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error getting recipes", error });
  }
});

// Retrieving A single recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate("categories");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
});

// PUT request to update a recipe by ID
router.put("/:id", async (req, res) => {
  try {
    // Find the recipe by ID and update it
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe", error });
  }
});

// Delete a recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
});

export default router;
