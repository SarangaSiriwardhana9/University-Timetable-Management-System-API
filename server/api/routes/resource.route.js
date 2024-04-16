import express from "express";
import { createResource, getAllResources,deleteResource, updateResource } from "../controllers/resourse.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { verifyLecturerOrAdmin } from "../middlewares/verifyLectureOrAdmin.js";
const router = express.Router();

router.post("/createResource", verifyToken, verifyAdmin, createResource); // Create a new resource
router.get("/getAllResources", verifyToken,verifyLecturerOrAdmin, getAllResources); // Get all resources
router.delete("/deleteResource/:id", verifyToken, verifyAdmin, deleteResource); // Delete a resource
router.put("/updateResource/:id", verifyToken, verifyAdmin, updateResource); // Update a resource


export default router;
