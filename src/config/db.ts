import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB conectado en: ${conn.connection.host}:${conn.connection.port}`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); // Salir si falla la conexión
  }
};