import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

class Database {

    static async connect() {
        if (!Database.instance) {

            await mongoose.connect(process.env.MONGO_URL, {
                maxPoolSize: 50
            })

            console.log("Connect success to MongoDB")

            Database.instance = mongoose.connection
        }

        return Database.instance
    }
}

export default Database