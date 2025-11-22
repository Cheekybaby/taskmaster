import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            trim: true,
            maxLength: 25,
        },
        description: {
            type: String,
            trim: true,
            maxLength: 100,
        },
        isComplete : {
            type: Boolean,
            default: false,
        },
        difficulty : {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },
        timeSpent : {
            type : Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)

const Task = mongoose.model("Task", taskSchema);
export default Task;