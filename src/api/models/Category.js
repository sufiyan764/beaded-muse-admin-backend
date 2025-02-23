"use strict";

import { CommonModel, MONGO_MODEL } from ".";

const getCategories = async (headers) => {
  const categories = await MONGO_MODEL.mongoFind("categories", {});
  return categories;
};

const addCategory = async (body) => {
  const { name, description } = body;
  const id = await CommonModel.counter("categories");
  const insertObj = {
    id,
    name,
    description,
  };
  await MONGO_MODEL.mongoInsertOne("categories", insertObj);
};

const detailCategory = async (headers) => {
  const { id } = headers;
  const category = await MONGO_MODEL.mongoFindOne("categories", { id });
  return category;
};

const deleteCategory = async (headers) => {
  const { id } = headers;
  await MONGO_MODEL.mongoDeleteOne("categories", { id });
  return {
    status: true,
    statusCode: 200,
    message: "Category deleted successfully",
  };
};

const updateCategory = async (body) => {
  let { id, name = "", description = "" } = body;
  const updateObj = {
    ...(name && { name }),
    ...(description && { description }),
  };
  await MONGO_MODEL.mongoFindOneAndUpdate(
    "suppliers",
    { id },
    { $set: updateObj }
  );
  return {
    status: true,
    statusCode: 200,
    message: "Category updated successfully",
  };
};

export const CategoryModel = {
  getCategories,
  addCategory,
  detailCategory,
  deleteCategory,
  updateCategory,
};
