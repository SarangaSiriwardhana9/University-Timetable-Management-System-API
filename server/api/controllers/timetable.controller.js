import Timetable from "../models/timetable.model.js";
import { errorHandler } from "../utils/error.js";
import moment from "moment";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import Course from "../models/course.model.js";
import Classroom from "../models/classroom.model.js";


// Create a new timetable slot
export const createTimetableSlot = async (req, res, next) => {
  const { courseId, classroomId, resourceIds, date, startTime, endTime,type, faculty, year, semester } = req.body;
  try {
    // Identify the day from the provided date
    const day = moment(date).format("dddd");

    // Check if the classroom is already booked for the specified date and time
    const existingSlot = await Timetable.findOne({
      classroomId: classroomId,
      date: date,
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gt: startTime } }
          ]
        },
        {
          $and: [
            { startTime: { $lt: endTime } },
            { endTime: { $gte: endTime } }
          ]
        }
      ]
    });
    if (existingSlot) {
      return next(errorHandler(400, "Classroom is already booked for this time period!"));
    }

    const newSlot = await Timetable.create({
      courseId: courseId,
      classroomId: classroomId,
      resourceIds: resourceIds,
      date: date,
      day: day, // Store the identified day
      startTime: startTime,
      endTime: endTime,
      faculty: faculty,
      type: type,
      year: year,
      semester: semester
    });
    res.status(201).json({ message: "Timetable slot created successfully!", slot: newSlot });
  } catch (error) {
    next(error);
  }
};


// Update a timetable slot
export const updateTimetableSlot = async (req, res, next) => {
  const { faculty, year, semester, classroomId, date, startTime, endTime } = req.body;
  try {
    // Check if the classroom is available for the new time slot in the new year and semester
    const existingSlot = await Timetable.findOne({
      classroomId,
      year,
      semester,
      date,
      $or: [
        { $and: [{ startTime: { $gte: startTime } }, { startTime: { $lt: endTime } }] },
        { $and: [{ endTime: { $gt: startTime } }, { endTime: { $lte: endTime } }] },
        { $and: [{ startTime: { $lte: startTime } }, { endTime: { $gte: endTime } }] },
      ],
    });

    if (existingSlot && existingSlot._id.toString() !== req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Classroom already allocated for the specified time period!",
        statusCode: 400,
      });
    }

    // Check if the existing slot is the same as the new slot
    const newSlot = {
      faculty,
      year,
      semester,
      classroomId,
      date,
      startTime,
      endTime,
    };

    if (JSON.stringify(existingSlot) === JSON.stringify(newSlot)) {
      return res.status(200).json({
        success: true,
        message: "No changes made to the timetable slot.",
        statusCode: 200,
      });
    }

    // Update the timetable slot
    const updatedSlot = await Timetable.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedSlot) {
      return next(errorHandler(404, "Timetable slot not found!"));
    }

    // Notify users of timetable changes
    const affectedUsers = await User.find({
      faculty,
      year,
      semester,
    });
    const course = await Course.findById(updatedSlot.courseId);
    const classroom = await Classroom.findById(updatedSlot.classroomId);

    const notificationMessage = `Timetable slot updated for ${date}, ${startTime} - ${endTime} ${classroom.name} for ${course.courseName}.`;
console.log (notificationMessage)
   
      await Notification.create({
        userId: User._id,
        message: notificationMessage,
        timetableSlotId: req.params.id,
        faculty: faculty,
        year: year,
        semester: semester,

    })

    res.status(200).json(updatedSlot);
  } catch (error) {
    next(error);
  }
};




//get timetable slots by faculty, year and semester
export const getTimetableSlotsByFacultyYearSemester = async (req, res, next) => {
  const { faculty, year, semester } = req.body;
  try {
    const timetableSlots = await Timetable.find({ faculty, year, semester }).sort({ date: 1, startTime: 1 });
    res.status(200).json(timetableSlots);
  } catch (error) {
    next(error);
  }
};

// Get timetable slots by faculty, year, semester, and day

export const getTimetableSlotsByCriteria = async (req, res, next) => {
  const { faculty, year, semester, day } = req.query;
  try {
    const timetableSlots = await Timetable.find({
      faculty: faculty,
      year: year,
      semester: semester,
      day: day,
    }).sort({ date: 1, startTime: 1 });

    res.status(200).json(timetableSlots);
  } catch (error) {
    next(error);
  }
};


/// Get timetable slots by faculty, year, and semester
export const getTimetableSlotsByUser = async (req, res, next) => {
  try {
    // Extract userId from the request
    const userId = req.user.id;

    // Find the user based on userId
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    // Extract faculty, year, and semester from the user object
    const { faculty, year, semester } = user;

    // Query the database to get timetable slots based on the user's faculty, year, and semester
    const timetableSlots = await Timetable.find({ faculty, year, semester });

    // Return the timetable slots
    res.status(200).json(timetableSlots);
  } catch (error) {
    next(error);
  }
};


