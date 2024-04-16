import express from "express";
import { createTimetableSlot,  getTimetableSlotsByCriteria, getTimetableSlotsByFacultyYearSemester, getTimetableSlotsByUser, updateTimetableSlot } from "../controllers/timetable.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { verifyStudent } from "../middlewares/verifyStudent.js";
const router = express.Router();

router.post("/createTimetableSlot", verifyToken, verifyAdmin, createTimetableSlot); 
router.put("/updateTimetableSlot/:id", verifyToken,verifyAdmin, updateTimetableSlot);
router.post("/getTimetableSlotsByFacultyYearSemester", verifyToken, getTimetableSlotsByFacultyYearSemester);
router.get("/slots", verifyToken, getTimetableSlotsByCriteria);
router.get("/timetableSlots", verifyToken,verifyStudent, getTimetableSlotsByUser);

export default router;
