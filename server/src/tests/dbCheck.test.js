import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import Database from '../dbs/init.mongo.js';

dotenv.config();

async function checkDatabaseNotEmpty() {
    try {
        await Database.connect();
        const count = await User.countDocuments();
        console.log(`Checking if database is not empty... Found ${count} users.`);

        if (count > 0) {
            console.log('Success: Database is not empty.');
            process.exit(0);
        } else {
            console.error('Failure: Database is empty.');
            process.exit(1);
        }
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

checkDatabaseNotEmpty();