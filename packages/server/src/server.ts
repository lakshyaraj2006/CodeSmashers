import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDb } from "./db";
import morgan from "morgan";
import { AuthRouter } from "./routes/auth.route";
const app = express();
const port = process.env.PORT || 8080;

// Connect to database
connectDb()
    .then(() => {
        // Enable logging
        if (process.env.NODE_ENV === "development") {
            app.use(morgan("dev"))
        }

        // If connected to database, run the server

        // Body parser middleware
        app.use(express.json());

        // API Routes
        app.use("/api/v1/auth", AuthRouter);

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        })
    })
    .catch((error) => {
        // Else show the error & exit the server
        console.log("Error connecting to database: ", error);
        process.exit(1);
    })
