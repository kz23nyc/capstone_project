import mongoose from "mongoose";

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
    instructions: {
      type: String,
      required: true
    },
    ingredients: [String],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, 
{ timestamps: true });

export default mongoose.model("Recipe", recipeSchema);