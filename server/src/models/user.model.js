// !dmbg
import mongoose from 'mongoose';

const COLLECTION_NAME = "users"
const DOCUMENT_NAME = "user"

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
export default mongoose.model(DOCUMENT_NAME, userSchema);