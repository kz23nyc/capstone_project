import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


app.get('/', (req,res) => {
    res.send('Welcome to my Pantrylicious recipe API!')
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// =========== Middleware ===== //

//Enable CORS for all requests
app.use(cors());

// Log all requests using morgan with the 'dev' format
app.use(morgan('dev')); // logger
