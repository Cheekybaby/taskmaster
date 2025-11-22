import Task from "../models/task.model.js";
import mongoose from "mongoose";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Task id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error in getTask controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, difficulty } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Please provide the required fields",
      });
    }
    const task = await Task.create({
      title,
      description,
      isComplete,
      difficulty,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error in createTask controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Task id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const updateData = {};

    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.description !== undefined)
      updateData.description = req.body.description;
    if (req.body.isComplete !== undefined)
      updateData.isComplete = req.body.isComplete;
    if (req.body.difficulty !== undefined)
      updateData.difficulty = req.body.difficulty;

    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error in updateTask controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateTimeSpent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Task id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const { timeSpent } = req.body;

    // Validation for timeSpent
    if (timeSpent === undefined) {
      return res.status(400).json({ message: "timeSpent is required" });
    }

    if (typeof timeSpent !== "number" || isNaN(timeSpent)) {
      return res
        .status(400)
        .json({ message: "timeSpent must be a valid number" });
    }

    if (timeSpent <= 0) {
      return res
        .status(400)
        .json({ message: "timeSpent must be greater than 0" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.timeSpent += timeSpent;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error in updateTimeSpent controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Task id is required",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteTask controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
