'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { OrderController } from '../controllers'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const OrderRouter = new Express.Router()

OrderRouter.post('/', WatchTower(OrderController.getOrders))
OrderRouter.post('/detail', WatchTower(OrderController.detailOrder))
OrderRouter.delete('/delete', WatchTower(OrderController.deleteOrder))
OrderRouter.put('/update', WatchTower(OrderController.updateOrder))

OrderRouter.use(sendResponse)

export { OrderRouter }
