"use strict";

import { CommonModel, MONGO_MODEL } from ".";

const getProducts = async (body) => {
  const { skip = 0, limit = 10000 } = body;
  const query = {}
  const options = {
    skip,
    limit,
    sortObj: { _id: -1 }
  }
  const products = await MONGO_MODEL.mongoFindWithSkipAndLimitWithSort("products", query, options);
  const totalCount = await MONGO_MODEL.mongoCountDocuments("products", query)
  return { data: products, totalCount }
};

const addProduct = async (body) => {
  const { categoryId, name, description, price, stock, images, size, color, neckline, fit, sleeveType, length, rating, isFeatured, discountPrice = "" } = body;
  const existingProduct = await MONGO_MODEL.mongoFindOne("products", { name })
  if (name.toLowerCase() === existingProduct?.name.toLowerCase()) return { status: false, statusCode: 400, message: "Product already exists" }
  const id = await CommonModel.counter("products");
  const insertObj = { id, categoryId, name, description, price, stock, images, size, color, neckline, fit, sleeveType, length, rating, isFeatured, ...(discountPrice && { discountPrice }) };
  await MONGO_MODEL.mongoInsertOne("products", insertObj);
  return {
    status: true,
    statusCode: 200,
    message: "Product added successfully",
  };
};

const detailProduct = async (headers) => {
  let { id } = headers;
  id = parseInt(id)
  const product = await MONGO_MODEL.mongoFindOne("products", { id });
  return product;
};

const deleteProduct = async (headers) => {
  let { id } = headers;
  id = parseInt(id)
  await MONGO_MODEL.mongoDeleteOne("products", { id });
  return {
    status: true,
    statusCode: 200,
    message: "Product deleted successfully",
  };
};

const updateProduct = async (body) => {
  let { id, categoryId = "", name = "", description = "", price = "", stock = "", images = "", size = "", color = "", neckline = "", fit = "", sleeveType = "", length = "", isFeatured = false, discountPrice = "" } = body;
  const existingProduct = await MONGO_MODEL.mongoFindOne("products", { name, id: { $ne: id } })
  if (name.toLowerCase() === existingProduct?.name.toLowerCase()) return { status: false, statusCode: 400, message: "Product already exists" }
  const updateObj = {
    ...(categoryId && { categoryId }),
    ...(name && { name }),
    ...(description && { description }),
    ...(price && { price }),
    ...(stock && { stock }),
    ...(images && { images }),
    ...(color && { color }),
    ...(neckline && { neckline }),
    ...(fit && { fit }),
    ...(sleeveType && { sleeveType }),
    ...(length && { length }),
    ...(size && { size }),
    ...(isFeatured && { isFeatured }),
    ...(discountPrice && { discountPrice }),
  };

  const unsetQuery = {
    $unset: {
      ...(isFeatured === false && { isFeatured: 1 }),
      ...(discountPrice === "" && { discountPrice: 1 })
    }
  }
  await MONGO_MODEL.mongoFindOneAndUpdate(
    "products",
    { id },
    { $set: updateObj, ...unsetQuery },

  );
  return {
    status: true,
    statusCode: 200,
    message: "Product updated successfully",
  };
};

export const ProductModel = {
  getProducts,
  addProduct,
  detailProduct,
  deleteProduct,
  updateProduct,
};
