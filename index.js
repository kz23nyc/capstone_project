import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import recipeRoutes from "./routes/recipeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
const app = express();
app.use(cors()); //Enable Cross-Origin Resource Sharing
app.use(express.json()); // parse incoming JSON request bodies
app.use(morgan("dev")); // logger for development

const PORT = process.env.PORT || 4000;

// =========== Connect to MongoDB===== //
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to MongoDB`))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

app.get("/", (req, res) => {
  res.send("Welcome to my Pantrylicious API!");
});

// =========== Routes ===== //
app.use("/api/recipes", recipeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentRoutes);

// Handling 404 Not Found
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
