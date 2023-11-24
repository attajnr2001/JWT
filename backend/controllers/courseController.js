import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import { createCourse } from "../utils/createTemp.js";
import Course from "../models/CourseModel.js";

// adding courses to the Course table
const addCourse = asyncHandler(async (req, res) => {
  try {
    const { name, coreSubjects, electiveSubjects, headOfDeptId } = req.body;
    console.log(req.body);

    // Check if the headOfDeptId exists in the Teacher collection
    const headOfDeptExists = await Teacher.exists({ _id: headOfDeptId });
    if (!headOfDeptExists) {
      return res.status(404).json({ message: "Head of department not found" });
    }

    // Create the course
    const newCourse = await createCourse( 
      name,
      coreSubjects,
      electiveSubjects,
      headOfDeptId
    );

    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// endpoint to retrieve all courses
// this needs to be worked on to display the headOfDept name not id
const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find().populate('headOfDeptId', 'firstName lastName');
    res.json(courses);
  } catch (error) {
    res.status(404);
    throw new Error("Courses not found");
  }
});

export { addCourse, getAllCourses };
