//import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRouts from './routes/userRoutes.js';
import gameRouts from './routes/gameRoutes.js';


//config
dotenv.config();
connectDB();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//API
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('B-tape');
});

//Routers USER
app.use('/api/users', userRouts);
//Routers GAME
app.use('/api/game', gameRouts);
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT_API || 5000;
app.listen(
  PORT, 
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port -> ${PORT}`.yellow.bold)
);
