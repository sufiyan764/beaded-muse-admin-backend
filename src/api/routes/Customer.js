'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { CustomerController } from '../controllers'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const CustomerRouter = new Express.Router()

CustomerRouter.get('/', WatchTower(CustomerController.getCustomers))
CustomerRouter.get('/detail', WatchTower(CustomerController.detailCustomer))
CustomerRouter.delete('/delete', WatchTower(CustomerController.deleteCustomer))

CustomerRouter.use(sendResponse)

export { CustomerRouter }
