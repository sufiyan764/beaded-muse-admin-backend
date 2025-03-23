"use strict";

import { MONGO_MODEL } from ".";

const getCustomers = async (body) => {
  const { skip = 0, limit = 10000 } = body;
  const query = {};
  const options = {
    skip,
    limit,
    sortObj: { _id: -1 },
  };
  const customers = await MONGO_MODEL.mongoFindWithSkipAndLimitWithSort("customers", query, options);
  return customers;
};

const detailCustomer = async (headers) => {
  let { id } = headers;
  id = parseInt(id);
  const category = await MONGO_MODEL.mongoFindOne("customers", { id });
  return category;
};

const deleteCustomer = async (headers) => {
  let { id } = headers;
  id = parseInt(id);
  await MONGO_MODEL.mongoDeleteOne("customers", { id });
  return {
    status: true,
    statusCode: 200,
    message: "Customer deleted successfully",
  };
};

export const CustomerModel = {
  getCustomers,
  detailCustomer,
  deleteCustomer,
};
