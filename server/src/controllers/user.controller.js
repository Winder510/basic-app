import {
    SuccessResponse
} from "../core/success.response.js"
import {
    UserService
} from "../services/user.service.js"

class UserController {
    createUser = async (req, res, next) => {
        const respond = await UserService.createUser(req.body)
        new SuccessResponse({
            message: "User created successfully",
            metadata: respond
        }).send(res)
    }

    getUsersByNameAndEmail = async (req, res, next) => {
        const respond = await UserService.getUsersByNameAndEmail(req.query)
        new SuccessResponse({
            message: "Users retrieved successfully",
            metadata: respond
        }).send(res)
    }

    bulkUpdateUsers = async (req, res, next) => {
        const respond = await UserService.bulkUpdateUsers(req.body.users)
        new SuccessResponse({
            message: "Users updated successfully",
            metadata: respond
        }).send(res)
    }
}

export default new UserController()