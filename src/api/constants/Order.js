"use strict";

const allOrders = (skip, limit) => {
  return [
    {
      $match: {},
    },
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              firstname: 1,
              lastname: 1,
              email: 1,
              phonenumber: 1,
            },
          },
        ],
        as: "customer",
      },
    },
    {
      $addFields: {
        customer: {
          $first: "$customer",
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
};

const orderDetail = (id) => {
  return [
    {
      $match: { id },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              firstname: 1,
              lastname: 1,
              email: 1,
              phonenumber: 1,
            },
          },
        ],
        as: "customer",
      },
    },
    {
      $addFields: {
        customer: {
          $first: "$customer",
        },
      },
    },
  ];
};

export const OrderConstants = {
  allOrders,
  orderDetail
};
