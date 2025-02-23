"use strict";

import { CommonModel, MONGO_MODEL } from ".";

const getProducts = async (headers) => {
  const products = await MONGO_MODEL.mongoFind("products", {});
  return products;
};

const addProduct = async (body) => {
  const { categoryId, name, description, price, stock, images, size, color, neckline, fit, sleeveType, length, rating } = body;
  const id = await CommonModel.counter("products");
  const insertObj = { id, categoryId, name, description, price, stock, images, size, color, neckline, fit, sleeveType, length, rating };
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
  let {  id, categoryId = "", name = "", description = "", price = "", stock = "", images = "", size = "", color = "", neckline = "", fit = "", sleeveType = "", length = "" } = body;
  const updateObj = {
    ...(categoryId && { categoryId }),
    ...(name && { name }),
    ...(price && { price }),
    ...(stock && { stock }),
    ...(images && { images }),
    ...(color && { color }),
    ...(neckline && { neckline }),
    ...(fit && { fit }),
    ...(sleeveType && { sleeveType }),
    ...(length && { length }),
  };
  await MONGO_MODEL.mongoFindOneAndUpdate(
    "suppliers",
    { id },
    { $set: updateObj }
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
