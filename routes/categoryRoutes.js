import express from 'express';
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

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: "Error updating category", error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
});

export default router;