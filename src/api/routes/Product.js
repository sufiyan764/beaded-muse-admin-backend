'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { ProductController } from '../controllers'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const ProductRouter = new Express.Router()

ProductRouter.post('/', WatchTower(ProductController.getProducts))
ProductRouter.post('/add', WatchTower(ProductController.addProduct))
ProductRouter.get('/detail', WatchTower(ProductController.detailProduct))
ProductRouter.delete('/delete', WatchTower(ProductController.deleteProduct))
ProductRouter.put('/update', WatchTower(ProductController.updateProduct))

ProductRouter.use(sendResponse)

export { ProductRouter }
