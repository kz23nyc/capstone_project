import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// Creating a New recipe
// router.post("/", async (req, res) => {
//     const { name, description, cookingTime, ingredients, categories } = req.body;
//     try {
//         // Convert category names to ObjectIDs
//         const categoryIds = await Promise.all(categories.map(async (categoryName) => {
//             const category = await Category.findOne({ name: categoryName });
//             if (!category) {
//                 throw new Error(`Category '${categoryName}' not found`);
//             }
//             return category._id;
//         }));

//         // Create the new recipe with category ObjectIDs
//         const newRecipe = new Recipe({
//             name,
//             description,
//             cookingTime,
//             ingredients,
//             categories: categoryIds
//         });

//         await newRecipe.save();
//         res.status(201).json(newRecipe);
//     } catch (error) {
//         console.error(`Error creating new recipe: ${error.message}`);
//         res.status(400).json({ message: "Error creating new recipe", error: error.message });
//     }
// });


router.post("/", async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ message: "Error creating new recipe", error });
    }
})

// Retrieving All recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error getting recipes", error });
    }
});

// Retrieving A single recipe by ID
router.get("/:recipeId", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipe", error });
    }
});

// Retrieving Comments for a recipe
router.get("/recipe/:recipeId/comments", async (req, res) => {
    try {
        const comments = await Comment.find({ recipe: req.params.recipeId }).populate('recipe');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
});

// Retrieving recipe by ingredients
router.get("/findByIngredients", async (req, res) => {
    try {
        const { ingredients } = req.query; // Expect ingredients as a comma-separated list
        const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

        const recipes = await Recipe.find({
            ingredients: { $all: ingredientList }
        });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error finding recipes with given ingredients", error });
    }
});


// PUT request to update a recipe by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        // Find the recipe by ID and update it
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update recipe' });
    }
});

// Partially updating a recipe by ID
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: "Error updating recipe", error });
    }
});

// Delete a recipe by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error });
    }
});

export default router;