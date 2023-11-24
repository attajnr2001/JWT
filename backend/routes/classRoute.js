import express from "express";
const router = express.Router();

import { createClass, getAllClasses } from "../controllers/classController.js";

router.post("/createClass", createClass);
router.get("/allClasses", getAllClasses);

export default router;
