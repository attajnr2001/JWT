import asyncHandler from "express-async-handler";
import { createClass as createClassService } from "../utils/createTemp.js";
import Class from "../models/classModel.js";

// POST /api/classes
const createClass = asyncHandler(async (req, res) => {
  try {
    const { courseId, className, teacherId } = req.body;
    console.log(req.body)
    const newClass = await createClassService(courseId, className, teacherId);

    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/classes
const getAllClasses = asyncHandler(async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("courseId", "name")
      .populate("teacherId", "firstName lastName");
    res.json(classes);
  } catch (error) {
    res.status(404).json({ message: "Classes not found" });
  }
});

export { createClass, getAllClasses };
