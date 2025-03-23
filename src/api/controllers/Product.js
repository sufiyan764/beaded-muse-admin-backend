'use strict'

import { ResponseBody } from '../../lib'
import { ProductModel } from '../models'

const getProducts = async (request, response, next) => {
    const { body } = request
    const result = await ProductModel.getProducts(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

const addProduct = async (request, response, next) => {
    const { body } = request
    const result = await ProductModel.addProduct(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

const detailProduct = async (request, response, next) => {
    const { headers } = request
    const result = await ProductModel.detailProduct(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}
const deleteProduct = async (request, response, next) => {
    const { headers } = request
    const result = await ProductModel.deleteProduct(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}
const updateProduct = async (request, response, next) => {
    const { body } = request
    const result = await ProductModel.updateProduct(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

export const ProductController = {
    getProducts,
    addProduct,
    detailProduct,
    deleteProduct,
    updateProduct
}
