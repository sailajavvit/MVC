import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import TodoRoutes from "./routes/todoRoutes.js";
import UserRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 9000;

const MONGO_URI = process.env.MONGO_URI;

const DB_NAME = process.env.DB_NAME;

const app = express();

app.use(express.json());

app.use("/api/v1/todos", TodoRoutes);

app.use("/api/v1/users", UserRoutes);

app.get("/", (req, res) => {

    res.send("API is running...");

});

const startServer = async () => {
    try {
        await connectDB(MONGO_URI, DB_NAME);

        app.listen(PORT, () => {

            console.log(`Server running on port http://localhost:${PORT}`);

        });
    }
    catch (err) {
        console.error("Server failed to start because MongoDB is not ready.");
        process.exit(1);
    }
};

startServer();
