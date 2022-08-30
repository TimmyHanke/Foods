import config from "../config.json";
import http from "./httpService";

export function getFoods() {
  return http.get(config.apiEndpointFoods);
}
export function getFood(id) {
  return http.get(`http://localhost:8000/api/foods/${id}`);
}

export function saveFood(food) {
  const { _id: foodId, ...body } = food;
  if (foodId) {
    return http.put(`http://localhost:8000/api/foods/${foodId}`, body);
  }

  return http.post(config.apiEndpointFoods, body);
}

export function deleteFood(id) {
  return http.delete(config.apiEndpointFoods + id);
}
