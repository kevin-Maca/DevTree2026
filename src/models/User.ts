import mongoose, { Schema, skipMiddlewareFunction } from "mongoose"; 

//The interface is the representation of our data, like a DTO: 

export interface IUser{ name: String, email: String, password: String, handle: string } 

//The schema is the representation of our collection or table in our data base: 

const userSchema = new Schema({ 
    handle: { 
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        unique: true
    }, 
    
    name: { 
        type: String, 
        required: true, 
        trim: true 
    }, 
    
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true,
        lowercase: true 
    }, 
    password: { 
        type: String, 
        required: true, 
        trim: true 
    } 
}) 
    
    //Now we are going to allow the use of schema form any please of our code or project 
    //<User> This is the name of our interface 

    const User = mongoose.model<IUser>('User', userSchema); 
    
    export default User;