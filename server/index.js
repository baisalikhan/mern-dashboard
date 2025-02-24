import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* CONFIGURATION */
dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Set security-related HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow cross-origin resource sharing
app.use(morgan("common")); // Log HTTP requests
app.use(bodyParser.json()); // Parse JSON bodies (alternative to express.json())
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000; // Use the PORT from .env or default to 9000
const MONGO_URL = process.env.MONGO_URL; // Get MongoDB connection URL from .env

mongoose
  .connect(MONGO_URL) // Connect to MongoDB
  .then(() => {
    console.log("Connected to MongoDB"); // Log successful connection
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); // Start the server
  })
  .catch((error) => console.log(`${error} did not connect`)); // Log connection errors