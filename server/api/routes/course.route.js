import express from "express";
import { createCourse, updateCourse, deleteCourse, assignLecturers, assignInstructors,getAvailableCoursesForStudent,  getCourseByName, getAllCourses, getCoursesByYearAndSemester, getCoursesByFaculty, getStudentsByCourse,getAssignedCourses,removeAssignedUser,enrollCourse,getEnrolledCourses  } from "../controllers/course.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyLecturerOrInstructor } from "../middlewares/verifyLecturerOrInstructor.js";
import { verifyLecturerOrAdmin } from "../middlewares/verifyLectureOrAdmin.js";
import { verifyStudent } from "../middlewares/verifyStudent.js";

const router = express.Router();

router.post("/createCourse", verifyToken, verifyAdmin, createCourse); // Create a new course
router.put("/updateCourse/:id", verifyToken, verifyAdmin, updateCourse); // Update an existing course
router.delete("/deleteCourse/:id", verifyToken, verifyAdmin, deleteCourse); // Delete a course

router.put("/assignLecturers/:id", verifyToken, verifyAdmin, assignLecturers); // Assign Lecturers to a course
router.put("/assignInstructors/:id", verifyToken, verifyAdmin, assignInstructors); // Assign Instructors to a course

router.get("/courseByName/:name", verifyToken, getCourseByName); // Get course details by course name
router.get("/getAllCourses", verifyToken, getAllCourses); // Get all courses
router.get("/coursesByYearAndSemester/:year/:semester", verifyToken, getCoursesByYearAndSemester); // Get all courses by year and semester
router.get("/coursesByFaculty/:faculty", verifyToken, getCoursesByFaculty); // Get all courses by faculty


router.post("/enrollCourse/:id", verifyToken,verifyStudent, enrollCourse); // Enroll a student to a course
router.get('/enrolled-courses',verifyToken, verifyStudent,getEnrolledCourses);
router.get('/available-courses',verifyToken, verifyStudent,getAvailableCoursesForStudent);

router.get("/studentsByCourse/:id", verifyToken,verifyLecturerOrAdmin, getStudentsByCourse); // Get all students who enroll in a course
router.get("/getAssignedCourses", verifyToken, verifyLecturerOrInstructor, getAssignedCourses);//get assigned courses for a lecturer or instructor

 router.delete("/:courseId/remove-user/:userId", verifyToken,verifyAdmin, removeAssignedUser); // Remove assigned user from a course

export default router;
