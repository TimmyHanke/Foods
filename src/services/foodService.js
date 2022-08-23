import config from "../config.json";
import http from "./httpService";

export function getFoods() {
  return http.get(config.apiEndpointFoods);
}
export function getFoodsId(id) {
  return http.get(`http://localhost:8000/api/foods/${id}`);
}

export function getCategories() {
  return http.get(config.apiEndpointCategories);
}

export function getCreateFood(data) {
  return http.post(config.apiEndpointFoods, data);
}

export function getChangeFood(id, data) {
  return http.put(`http://localhost:8000/api/foods/${id}`, data);
}

export function deleteFood(id) {
  return http.delete(config.apiEndpointFoods + id);
}

// export function getFood(id) {
//   return foods.find((food) => food._id === id);
// }

// export function saveFood(food) {
//   let foodInDb = foods.find((f) => f._id === food._id) || {};
//   foodInDb.name = food.name;
//   foodInDb.category = getCategories().find(
//     (category) => category._id === food.categoryId
//   );
//   foodInDb.numberInStock = food.numberInStock;
//   foodInDb.price = food.price;

//   if (!foodInDb._id) {
//     foodInDb._id = Date.now().toString();
//     foods.push(foodInDb);
//   }

//   return foodInDb;
// }

// export function deleteFood(id) {
//   let foodInDb = foods.find((food) => food._id === id);
//   foods.splice(foods.indexOf(foodInDb), 1);
//   return foodInDb;
// }
