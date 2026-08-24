import data from "./products.json";

export function getAllProducts() {
  return data;
}

export function getCategories() {
  return [...new Set(data.map((p) => p.category))];
}

export function getProductById(id) {
  return data.find((p) => String(p.id) === String(id));
}
