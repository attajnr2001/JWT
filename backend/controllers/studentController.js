import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import { addStudent as addStudentService } from "../utils/createTemp.js";

// POST /api/students
const addStudent = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, hall, classId, courseId, year } = req.body;

    const newStudent = await addStudentService(
      firstName,
      lastName,
      hall,
      classId,
      courseId,
      year
    );

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/students
const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find()
      .populate("class", "className")
      .populate("course", "name");
    res.json(students);
  } catch (error) {
    res.status(404).json({ message: "Students not found" });
  }
});
export { addStudent, getAllStudents };
