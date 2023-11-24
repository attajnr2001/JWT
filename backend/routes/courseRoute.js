//  this is the route for course related endpoints
// this endpoints needs to be protected
import express from "express";
const router = express.Router();
import { addCourse, getAllCourses } from "../controllers/courseController.js";

router.post("/addCourse", addCourse);
router.get('/allCourses', getAllCourses);

export default router;