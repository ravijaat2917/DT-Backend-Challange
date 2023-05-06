import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/ConnectDataBase.js';
import router from './Routes/Routes.js';
import morgan from 'morgan';
import ExpressFormidable from 'express-formidable';

const app = express();

// Config Environmental Data
dotenv.config();
app.use(express.json())

app.use(morgan('dev'));
app.use(ExpressFormidable());

// Making Database Connection
connectDB();

// Making routes working
app.use('/api/v3/app', router);

// Making backend Port
const PORT = process.env.PORT ;

// Listening app
app.listen(PORT, () => {
    console.log(`App is Listening On Port : ${PORT}`);
})