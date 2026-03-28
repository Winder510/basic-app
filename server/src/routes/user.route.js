import express from 'express'
import userController from '../controllers/user.controller.js'
import {
    asyncErrorHandler
} from '../helper/index.js'
import basicAuthen from '../middleware/basic-authen.js'

const router = express.Router()

router.post('', basicAuthen.checkApiKey, asyncErrorHandler(userController.createUser))
router.get('', basicAuthen.checkApiKey, asyncErrorHandler(userController.getUsersByNameAndEmail))
router.post('/bulk-update', basicAuthen.checkApiKey, asyncErrorHandler(userController.bulkUpdateUsers))


export default router