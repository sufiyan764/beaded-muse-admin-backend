'use strict'

import { ResponseBody } from '../../lib'
import { CategoryModel } from '../models'

const getCategories = async (request, response, next) => {
    const { headers } = request
    const result = await CategoryModel.getCategories(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

const addCategory = async (request, response, next) => {
    const { body } = request
    const result = await CategoryModel.addCategory(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

const detailCategory = async (request, response, next) => {
    const { headers } = request
    const result = await CategoryModel.detailCategory(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}
const deleteCategory = async (request, response, next) => {
    const { headers } = request
    const result = await CategoryModel.deleteCategory(headers)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}
const updateCategory = async (request, response, next) => {
    const { body } = request
    const result = await CategoryModel.updateCategory(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody
    next()
}

export const CategoryController = {
    getCategories,
    addCategory,
    detailCategory,
    deleteCategory,
    updateCategory
}
