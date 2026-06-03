import {
  getAllProducts,
  getProductById,
  getFilteredProducts,
} from "../model/product.repo.js";

export async function fetchAllProducts() {
  const rows = await getAllProducts();
  return rows || [];
}

export async function fetchProductById(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return await getProductById(parsedId);
}

export async function fetchFilteredProducts(query) {
  const parsedMin =
    query.minPrice !== undefined && query.minPrice !== ""
      ? Number(query.minPrice)
      : null;

  const parsedMax =
    query.maxPrice !== undefined && query.maxPrice !== ""
      ? Number(query.maxPrice)
      : null;

  const filters = {
    category: query.category?.trim() || null,
    environment: query.environment?.trim() || null,
    minPrice: Number.isNaN(parsedMin) ? null : parsedMin,
    maxPrice: Number.isNaN(parsedMax) ? null : parsedMax,
    sort: query.sort || null,
  };

  const rows = await getFilteredProducts(filters);
  return rows || [];
}