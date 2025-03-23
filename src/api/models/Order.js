"use strict";

import { MONGO_MODEL } from ".";

const getOrders = async (body) => {
  const { skip = 0, limit = 10000 } = body;
  const query = {};
  const options = {
    skip,
    limit,
    sortObj: { _id: -1 },
  };
  const orders = await MONGO_MODEL.mongoFindWithSkipAndLimitWithSort("orders", query, options);
  return orders;
};

const detailOrder = async (headers) => {
  let { id } = headers;
  id = parseInt(id)
  const category = await MONGO_MODEL.mongoFindOne("orders", { id });
  return category;
};

const deleteOrder = async (headers) => {
  let { id } = headers;
  id = parseInt(id)
  await MONGO_MODEL.mongoDeleteOne("orders", { id });
  return {
    status: true,
    statusCode: 200,
    message: "Order deleted successfully",
  };
};

const updateOrder = async (body) => {
  let { id, status = "" } = body;
  const updateObj = {
    ...(status && { status }),
  };
  await MONGO_MODEL.mongoFindOneAndUpdate(
    "orders",
    { id },
    { $set: updateObj }
  );
  return {
    status: true,
    statusCode: 200,
    message: "Order updated successfully",
  };
};

export const OrderModel = {
  getOrders,
  detailOrder,
  deleteOrder,
  updateOrder,
};
