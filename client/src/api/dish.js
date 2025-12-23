import api from "./axios";

export const getRecommendations = (filters = {}) => {
  const params = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return;
    }

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params[key] = value; // keep as array
      }
      return;
    }

    params[key] = value;
  });

  return api.get("/dishes/recommendations", {
    params,
    paramsSerializer: {
      serialize: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else {
            searchParams.append(key, value);
          }
        });

        return searchParams.toString();
      },
    },
  });
};

export const getDishById = (id) => {
  return api.get(`/dishes/${id}`);
};  

export const addDish = (dishData) => {
  return api.post("/dishes", dishData);
};

export const updateDish = (id, dishData) => {
  return api.put(`/dishes/${id}`, dishData);
};

export const deleteDish = (id) => {
  return api.delete(`/dishes/${id}`);
};

export const getAllDishes = () => {
  return api.get("/dishes", {
    params: {},
  });
};  

