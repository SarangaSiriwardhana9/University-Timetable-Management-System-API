import express from "express";
import { updateUser,deleteUser, updateSemesterAndYear } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { verifyStudent } from "../middlewares/verifyStudent.js";

const router = express.Router();

router.post("/update:/id",verifyToken,updateUser)
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/update-semester-year',verifyToken, verifyStudent,updateSemesterAndYear);


export default router;
 