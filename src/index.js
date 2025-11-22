import express from "express";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./utils/db.js";
import taskRouter from "./routes/task.route.js";
import cors from "cors";

const app = express();

app.use(cors ({
    origin: "https://sentinel.raashah.me",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/task", taskRouter);

app.get('/', (req, res) => {
    res.send("Hellow World!")
})

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});