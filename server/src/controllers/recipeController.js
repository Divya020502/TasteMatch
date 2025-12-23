// filepath: /Users/dhanadivya/TasteMatch/server/src/controllers/recipeController.js

import Recipe from "../models/Recipe.js";

// Get all recipes
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get recipe by ID
export const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get recipe by dish name
export const getRecipeByDishName = async (req, res) => {
    try {
        const { dishName } = req.params;
        const recipe = await Recipe.findOne({ dishName: new RegExp(dishName, 'i') });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create new recipe
export const createRecipe = async (req, res) => {
    try {
        const { dishName, ingredients, steps, cookingTime, calories } = req.body;
        const recipe = await Recipe.create({
            dishName,
            ingredients,
            steps,
            cookingTime,
            calories
        });
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update recipe
export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete recipe
export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json({ message: 'Recipe deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



