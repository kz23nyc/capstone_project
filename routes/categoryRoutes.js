import express from 'express';
import Recipe from '../models/Recipe.js';
import Category from '../models/Category.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: "Error creating category", error });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error });
    }
});

router.get('/:categoryName', async (req, res) => {
    try {
        const { categoryName } = req.params;
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const recipes = await Recipe.find({ categories: category._id }).populate('categories');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recipes by category', error });
    }
});

// PUT route to update categories in a recipe
router.put('/:id/categories', async (req, res) => {
    try {
       // Extract categories from request body and find corresponding ObjectIds
       const categoryIds = await getCategoryIdsFromNames(req.body.categories);

        // Update the recipe with new category IDs
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            // Ensuring only the categories field is updated
            { $set: { categories: categoryIds } }, 
            // Return the updated object and run schema validators 
            { new: true, runValidators: true }  
        ).populate('categories');

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.error("Error updating recipe categories:", error);
        res.status(500).json({ message: 'Failed to update recipe categories', error: error.toString() });
    }
});

// Deleting a Category by ID
router.delete("/:id", async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting category", error });
    }
  });

export default router;