import Category from "../models/Category.js";

/**
 *  *To convert an array of category names (e.g ["Vegan", "Dinner"])
 * Convert an array of category names to an array of ObjectIds.
 * Throws an error if any category is not found.
 * @param {Array} categoryNames - Array of category names
 * @returns {Promise<Array>} Array of ObjectIds
 */

export const getCategoryIdsFromNames = async (categoryNames) => {
    const categoryIds = await Promise.all(
      categoryNames.map(async (name) => {
        const category = await Category.findOne({ name });
        if (!category) {
          throw new Error(`Category not found: ${name}`);
        }
        return category._id;
      })
    );
    return categoryIds;
  };