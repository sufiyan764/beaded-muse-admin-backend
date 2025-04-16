"use strict";

import { CommonModel, MONGO_MODEL } from ".";

const getCategories = async (headers) => {
  const categories = await MONGO_MODEL.mongoFind("categories", {});
  return categories;
};

const addCategory = async (body) => {
  const { name, description, image } = body;
  const existingCategory = await MONGO_MODEL.mongoFindOne("categories", { name })
  if(name.toLowerCase() === existingCategory?.name.toLowerCase()) return { status: false, statusCode: 400, message: "Category already exists" }
  const id = await CommonModel.counter("categories");
  const insertObj = {
    id,
    name,
    description,
    image,
  };
  await MONGO_MODEL.mongoInsertOne("categories", insertObj);
  return {
    status: true,
    statusCode: 200,
    message: "Category added successfully",
  };
};

const detailCategory = async (headers) => {
  let { id } = headers;
  id = parseInt(id)
  const category = await MONGO_MODEL.mongoFindOne("categories", { id });
  return category;
};

const deleteCategory = async (headers) => {
  let { id } = headers;
  id = parseInt(id)
  await MONGO_MODEL.mongoDeleteOne("categories", { id });
  return {
    status: true,
    statusCode: 200,
    message: "Category deleted successfully",
  };
};

const updateCategory = async (body) => {
  let { id, name = "", description = "", image = "" } = body;
  const existingCategory = await MONGO_MODEL.mongoFindOne("categories", { name, id: { $ne: id } })
  if(name.toLowerCase() === existingCategory?.name.toLowerCase()) return { status: false, statusCode: 400, message: "Category already exists" }
  const updateObj = {
    ...(name && { name }),
    ...(description && { description }),
    ...(image && { image }),
  };
  await MONGO_MODEL.mongoFindOneAndUpdate(
    "categories",
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
