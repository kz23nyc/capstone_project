import express from 'express';
import mongoose from 'mongoose';
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
router.put('/api/recipes/:id', async (req, res) => {
    try {
        const { categories } = req.body;

        // Find ObjectIds for the provided category names
        const categoryIds = await Category.find({ name: { $in: categories } }).select('_id');
        console.log("Found Category IDs:", categoryIds);

        const categoryObjectIds = categoryIds.map(category => category._id);
        console.log("Mapped Category ObjectIds:", categoryObjectIds); 

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { categories: categoryObjectIds },
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.error("Error in updating recipe:", error);
        res.status(500).json({ error: 'Failed to update recipe' });
    }
});


router.delete("/:id", async (req, res) => {
    try {      
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
});

export default router;