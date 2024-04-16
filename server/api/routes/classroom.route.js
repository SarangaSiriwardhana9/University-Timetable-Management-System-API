import express from "express";
import { createClassroom, getAllClassrooms,deleteClassroom, updateClassroom } from "../controllers/classroom.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/createClassroom", verifyToken, verifyAdmin, createClassroom); // Create a new classroom
router.get("/getAllClassrooms", verifyToken, getAllClassrooms); // Get all classrooms
router.delete("/deleteClassroom/:id", verifyToken, verifyAdmin, deleteClassroom); // Delete a classroom
router.put("/updateClassroom/:id", verifyToken, verifyAdmin, updateClassroom); // Update a classroom


export default router;
