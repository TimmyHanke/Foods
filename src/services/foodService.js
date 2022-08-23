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
