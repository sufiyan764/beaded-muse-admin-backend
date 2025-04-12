"use strict";

import { MONGO_MODEL } from ".";
import { OrderConstants } from "../constants";

const getOrders = async (body) => {
  const { skip = 0, limit = 10000 } = body;
  const allOrdersQuery = OrderConstants.allOrders(skip, limit)
  const orders = await MONGO_MODEL.mongoAggregate("orders", allOrdersQuery)
  const totalCount = await MONGO_MODEL.mongoCountDocuments("orders", {})
  return { orders, totalCount }
};

const detailOrder = async (body) => {
  let { id } = body;
  id = parseInt(id)
  const orderDetailQuery = OrderConstants.orderDetail(id)
  let order = await MONGO_MODEL.mongoAggregate("orders", orderDetailQuery);
  order = order?.[0] || {}
  return order;
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
