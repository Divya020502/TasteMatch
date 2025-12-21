import { cosineSimilarity } from "../utils/cosineSimilarity.js";

const tasteToVector = (taste) => [
  taste.sweet,
  taste.spicy,
  taste.umami,
  taste.sour,
  taste.bitter,
];

export const recommendDishes = ({
  userTaste,
  dishes,
  cuisines,
  diet,
  limit = 10,
}) => {
  if (!userTaste) return [];

  const userVector = tasteToVector(userTaste);
  const normalizedDiet = diet?.toLowerCase();
  const normalizedCuisines = cuisines?.map((c) => c.toLowerCase());

  return dishes
    .filter((dish) => {
      if (
        normalizedDiet &&
        dish.diet?.toLowerCase() !== normalizedDiet
      ) {
        return false;
      }

      if (
        normalizedCuisines?.length &&
        !normalizedCuisines.includes(dish.cuisine.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .map((dish) => {
      const dishVector = tasteToVector(dish.tasteVector);
      const score = cosineSimilarity(userVector, dishVector);

      return {
        ...dish.toObject(),
        score: Number(score.toFixed(3)),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
