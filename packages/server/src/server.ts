import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server Setup!"
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
