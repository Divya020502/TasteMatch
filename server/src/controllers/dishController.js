import Dish from "../models/Dish.js";
import User from "../models/User.js";
import { recommendDishes } from "../services/recommender.js";

/**
 * @desc    Admin: Add new dish
 * @route   POST /api/dishes
 * @access  Admin
 */
export const addDish = async (req, res, next) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: delete dish
 * @route   DELETE /api/dishes/:id
 * @access  Admin
 */
export const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Dish.findByIdAndDelete(id);
    res.json({ message: "Dish deleted" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: update dish
 * @route   PUT /api/dishes/:id
 * @access  Admin
 */
export const updateDish = async (req, res, next) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.json(dish);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Admin: Get all dishes
 * @route   GET /api/dishes
 * @access  Admin
 */
export const getAllDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single dish by ID
 * @route   GET /api/dishes/:id
 * @access  Auth (User + Admin)
 */
export const getDishById = async (req, res, next) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get personalized dish recommendations
 * @route   GET /api/dishes/recommendations
 * @access  Auth
 */
export const getRecommendations = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const dishes = await Dish.find();

    let {
      diet,
      cuisines,
      search,
      minSpicy,
      minSweet,
      minUmami,
      minSour,
      minBitter
    } = req.query;

    // ✅ Normalize diet - use filter if provided, otherwise use user's preference
    const normalizedDiet = diet && diet !== "any"
      ? diet.toLowerCase().replace("_", "-")
      : user.diet;

    // ✅ Use cuisines from filter if provided, otherwise use user's preferences
    const filterCuisines = cuisines
      ? (Array.isArray(cuisines) ? cuisines : [cuisines])
      : user.cuisines || [];

    let recommendations = recommendDishes({
      userTaste: user.tasteProfile,
      dishes,
      cuisines: filterCuisines,
      diet: normalizedDiet,
      limit: 20,
    });

    // Search filter
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      recommendations = recommendations.filter((dish) =>
        dish.name.toLowerCase().includes(searchTerm) ||
        dish.cuisine.toLowerCase().includes(searchTerm)
      );
    }

    // Taste filters
    if (minSpicy)
      recommendations = recommendations.filter(
        (d) => d.tasteVector.spicy >= Number(minSpicy)
      );

    if (minSweet)
      recommendations = recommendations.filter(
        (d) => d.tasteVector.sweet >= Number(minSweet)
      );

    if (minUmami)
      recommendations = recommendations.filter(
        (d) => d.tasteVector.umami >= Number(minUmami)
      );

    if (minSour)
      recommendations = recommendations.filter(
        (d) => d.tasteVector.sour >= Number(minSour)
      );

    if (minBitter)
      recommendations = recommendations.filter(
        (d) => d.tasteVector.bitter >= Number(minBitter)
      );

    res.json(recommendations.slice(0, 10));
  } catch (err) {
    next(err);
  }
};
