import mongoose from "mongoose";
import {
    BadRequestError
} from "../core/error.response.js";
import userModel from "../models/user.model.js"
export class UserService {
    static loginDemo = async ({
        username
    }) => {
        const foundUser = await userModel.findOne({
            username
        }).lean()

        if (!foundUser) {
            return {
                message: "User not found",
                code: 404,
                metadata: null
            };
        }

        return {
            message: "success",
            code: 1,
            metadata: foundUser
        }

    }
    static createUser = async ({
        username,
        email,
        birthdate
    }) => {

        if (!username || !email || !birthdate) {
            throw new BadRequestError("Missing required fields: username, email, birthdate")
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new BadRequestError("Invalid email format")
        }

        if (isNaN(Date.parse(birthdate))) {
            throw new BadRequestError("Invalid birthdate format. Expected a valid date string.")
        }

        // check if user already exists
        const existingUser = await userModel.findOne({
            email
        }).lean()
        if (existingUser) {
            throw new BadRequestError("User with this email already exists")
        }

        const data = await userModel.create({
            username,
            email,
            birthdate: new Date(birthdate)
        });

        return data;
    }
    static getUsersByNameAndEmail = async ({
        q
    }) => {

        const query = {}

        if (q) {
            query.$or = [{
                    username: {
                        $regex: q,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: q,
                        $options: "i"
                    }
                }
            ];
        }

        const users = await userModel.find(
            query, {
                username: 1,
                email: 1,
                birthdate: 1
            }
        ).lean()

        return users.map(user => ({
            id: String(user._id),
            username: user.username,
            email: user.email,
            birthdate: user.birthdate ?
                user.birthdate.toISOString().slice(0, 10) : null
        }))
    }
    static bulkUpdateUsers = async (users) => {
        await this.#validateUsers(users)
        const bulkOps = users.map(item => {
            const updateData = {};

            if (item.username !== undefined) updateData.username = item.username;
            if (item.email !== undefined) updateData.email = item.email;
            if (item.birthdate !== undefined) updateData.birthdate = new Date(item.birthdate);

            return {
                updateOne: {
                    filter: {
                        _id: new mongoose.Types.ObjectId(item.id)
                    },
                    update: {
                        $set: updateData
                    }
                }
            };
        });

        await userModel.bulkWrite(bulkOps);

        return {
            message: "Bulk update users successfully",
        };
    };

    static async #validateUsers(users) {
        if (!Array.isArray(users) || users.length === 0) {
            throw new BadRequestError("Input must be a non-empty array of users");
        }

        const ids = users.map(item => item.id);

        if (ids.some(id => !id)) {
            throw new BadRequestError("Each record must include id");
        }

        const invalidIds = ids.filter(id => !mongoose.Types.ObjectId.isValid(id));
        if (invalidIds.length > 0) {
            throw new BadRequestError(`Invalid MongoId: ${invalidIds.join(", ")}`);
        }

        const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));

        const existingUsers = await userModel.find({
            _id: {
                $in: objectIds
            }
        }).lean();

        const foundIds = existingUsers.map(user => String(user._id));
        const missingIds = ids.filter(id => !foundIds.includes(String(id)));

        if (missingIds.length > 0) {
            throw new BadRequestError(`Users not found: ${missingIds.join(", ")}`);
        }

        // validate email + birthdate
        for (const item of users) {
            if (item.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) {
                throw new BadRequestError(`Invalid email format for user id ${item.id}`);
            }

            if (item.birthdate && isNaN(Date.parse(item.birthdate))) {
                throw new BadRequestError(`Invalid birthdate format for user id ${item.id}`);
            }
        }

    }
}