import express from 'express';
import 'dotenv/config'
import router from './router';
import cors from 'cors'
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

connectDB();

const app = express();

//Cors
app.use(cors(corsConfig));

//The next sentences read data, sent since a form or postman
app.use(express.json());
app.use('/', router);

export default app;

