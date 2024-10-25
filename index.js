import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// =========== Connect to DB ===== //
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongodb`);    
} catch (error) {
    console.error(error);
}

// =========== Middleware ===== //
app.use(morgan('dev')); // logger for development
app.use(express.json()); // parse incoming JSON request bodies
app.use(express.urlencoded({extended:true})); // Parses URL-encoded  bodies
app.use(cors()); //Enable Cross-Origin Resource Sharing- allow backend to talk to frontend in the same machine

//============ Routes ======== //
app.use('/', projectRouter); //use the recipe router

app.get('/', (req,res) => {
    res.send('Welcome to my Pantrylicious recipe API!')
});

// =========== Error Middleware ===== //
app.use((e, req, res, next) => {
    console.error(e);
    res.status(500).json({message: e.message, error:e})
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));