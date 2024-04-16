// routes/notification.route.js

import express from "express";
import { getNotificationsByUser,setNotificationAsRead,getAllNotifications,createCustomNotification ,deleteNotification} from "../controllers/notification.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import {verifyStudent} from "../middlewares/verifyStudent.js";
import {verifyAdmin} from "../middlewares/verifyAdmin.js";
import {verifyLecturerOrAdmin} from "../middlewares/verifyLectureOrAdmin.js";

const router = express.Router();

router.get("/getUserNotifications", verifyToken,verifyStudent, getNotificationsByUser);
router.put("/setNotificationAsRead/:notificationId", verifyToken,verifyStudent, setNotificationAsRead);
router.get("/getAllNotifications", verifyToken,verifyAdmin, getAllNotifications);
router.post("/createCustomNotification", verifyToken,verifyLecturerOrAdmin, createCustomNotification);
router.delete("/deleteNotification/:notificationId", verifyToken,verifyAdmin, deleteNotification);

export default router;
