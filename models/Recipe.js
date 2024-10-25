import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    cookingTime: { 
        type: Number, 
        required: true 
    },
    ingredients: [{ 
        type: String, 
        required: true 
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
