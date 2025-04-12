'use strict'

import { ResponseBody } from '../../lib'
import { OrderModel } from '../models'

const getOrders = async (request, response, next) => {
    const { body } = request
    const result = await OrderModel.getOrders(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

const detailOrder = async (request, response, next) => {
    const { body } = request
    const result = await OrderModel.detailOrder(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}
const deleteOrder = async (request, response, next) => {
    const { headers } = request
    const result = await OrderModel.deleteOrder(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}
const updateOrder = async (request, response, next) => {
    const { body } = request
    const result = await OrderModel.updateOrder(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

export const OrderController = {
    getOrders,
    detailOrder,
    deleteOrder,
    updateOrder
}
