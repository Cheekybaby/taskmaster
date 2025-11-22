import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import taskRouter from "./routes/task.route.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/task", taskRouter);

app.get('/', (req, res) => {
    res.send("Hellow World!")
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    connectDB();
})