import Announcement from "../models/announcement.model.js";
import User from "../models/user.model.js";

// Create a new announcement
export const createAnnouncement = async (req, res, next) => {
  const { title, content, faculty, year, semester } = req.body;
  const createdBy = req.user._id; 
  try {
    const newAnnouncement = await Announcement.create({
      title,
      content,
      faculty,
      year,
      semester,
      
    });
    res.status(201).json({ message: "Announcement created successfully!", announcement: newAnnouncement });
  } catch (error) {
    next(error);
  }
};

// Get all announcements
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    next(error);
  }
};

// Get announcements by faculty, year, and semester
export const getAnnouncementsByFacultyYearSemester = async (req, res, next) => {
  const { faculty, year, semester } = req.body;
  try {
    const announcements = await Announcement.find({ faculty, year, semester }).sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    next(error);
  }
};

// get announcement by users faculty, year, and semester
export const getAnnouncementsByUserFacultyYearSemester = async (req, res, next) => {
  const studentId = req.user.id; 
  const student = await User.findById(studentId);
  // Retrieve student 's faculty, year, and semester
  const faculty = student.faculty;
  const year = student.year;
  const semester = student.semester;
  try {
    const announcements = await Announcement.find({ faculty, year, semester }).sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    next(error);
  }
};
