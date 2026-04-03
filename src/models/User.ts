import mongoose, { Schema, skipMiddlewareFunction } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

//Now we are going to allow the use of schema form any please of our code or project

const user = mongoose.model('User', userSchema);
export default user