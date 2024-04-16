import express from "express";
import { createAnnouncement, getAllAnnouncements, getAnnouncementsByFacultyYearSemester,getAnnouncementsByUserFacultyYearSemester } from "../controllers/announcement.controller.js";
import {  verifyToken } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {verifyStudent} from "../middlewares/verifyStudent.js";


const router = express.Router();

router.post("/createAnnouncement", verifyToken, verifyAdmin, createAnnouncement);
router.get("/getAllAnnouncements", getAllAnnouncements);
router.post("/getAnnouncementsByFacultyYearSemester", verifyToken, getAnnouncementsByFacultyYearSemester);
router.post("/getAnnouncementsByUserFacultyYearSemester", verifyToken,verifyStudent , getAnnouncementsByUserFacultyYearSemester);

export default router;
