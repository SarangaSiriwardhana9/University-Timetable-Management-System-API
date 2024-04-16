import Classroom from "../models/classroom.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new classroom
export const createClassroom = async (req, res, next) => {
  try {
    const newClassroom = await Classroom.create(req.body);
    res.status(201).json({ message: "Classroom created successfully!", classroom: newClassroom });
  } catch (error) {
    next(error);
  }
};

// Update an existing classroom
export const updateClassroom = async (req, res, next) => {
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedClassroom) {
      return next(errorHandler(404, "Classroom not found!"));
    }
    res.status(200).json(updatedClassroom);
  } catch (error) {
    next(error);
  }
};


// Get all classrooms
export const getAllClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classroom.find();
    res.status(200).json(classrooms);
  } catch (error) {
    next(error);
  }
};

//delete a classroom
export const deleteClassroom = async (req, res, next) => {
  try {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found!" });
    }
    res.status(200).json({ message: "Classroom deleted successfully!" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid classroom ID!" });
    }
    next(error);
  }
};

