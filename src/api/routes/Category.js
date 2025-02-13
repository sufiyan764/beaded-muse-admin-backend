'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { CategoryController } from '../controllers'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const CategoryRouter = new Express.Router()

CategoryRouter.get('/', WatchTower(CategoryController.getCategories))
CategoryRouter.post('/add', WatchTower(CategoryController.addCategory))
CategoryRouter.get('/detail', WatchTower(CategoryController.detailCategory))
CategoryRouter.delete('/delete', WatchTower(CategoryController.deleteCategory))
CategoryRouter.put('/update', WatchTower(CategoryController.updateCategory))

CategoryRouter.use(sendResponse)

export { CategoryRouter }
