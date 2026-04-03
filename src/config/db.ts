import mongoose from 'mongoose';

export const connectDB = async () =>{
    try
    {
        const url = "mongodb+srv://kmacamonsalve:<6tIrxDj5mJrDgcGR>@cluster0.oncy6vh.mongodb.net"
        const {connection} = await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB conectado!');
    }catch(e)
    {
        console.log(e)
    }
}