import express from "express";
const router = express.Router();

import {
  addStudent,
  getAllStudents,
} from "../controllers/studentController.js";

router.get("/allStudents", getAllStudents);
router.post("/addStudent", addStudent);

export default router;
