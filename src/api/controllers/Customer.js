'use strict'

import { ResponseBody } from '../../lib'
import { CustomerModel } from '../models'

const getCustomers = async (request, response, next) => {
    const { body } = request
    const result = await CustomerModel.getCustomers(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

const detailCustomer = async (request, response, next) => {
    const { headers } = request
    const result = await CustomerModel.detailCustomer(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}
const deleteCustomer = async (request, response, next) => {
    const { headers } = request
    const result = await CustomerModel.deleteCustomer(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

export const CustomerController = {
    getCustomers,
    detailCustomer,
    deleteCustomer
}
