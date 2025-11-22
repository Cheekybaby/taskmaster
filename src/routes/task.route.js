import express from "express";
// import controller here
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  updateTimeSpent,
  deleteTask,
} from "../controllers/task.controller.js";
const router = express.Router();

router.get("/all", getAllTasks); // get all tasks
router.get("/:id", getTask); // get task by id
router.post("/add", createTask); // add a task
router.put("/update/:id", updateTask); // update task by id
router.patch("/time/:id", updateTimeSpent); // update the time spent on task with id
router.delete("/delete/:id", deleteTask); // delete task by id

export default router;
