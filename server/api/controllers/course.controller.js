import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js"; 
// Create a new course
export const createCourse = async (req, res, next) => {
  try {
    // Check if the request body contains a code field
    if (req.body.code === null) {
      throw errorHandler(400, "Code field cannot be null.");
    }
    const newCourse = await Course.create(req.body);
    res.status(201).json({ message: "Course created successfully!", course: newCourse });
  } catch (error) {
    next(error);
  }
};

// Update an existing course
export const updateCourse = async (req, res, next) => {
  try {
    // Exclude courseCode field from the update
    const { courseCode, ...updateData } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedCourse) {
      return next(errorHandler(404, "Course not found!"));
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// Delete a course
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid course ID!" });
    }
    next(error);
  }
};

// Assign Lecturers to a course
export const assignLecturers = async (req, res, next) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { lecturers: req.body.lecturers } },
      { new: true }
    );
    if (!updatedCourse) {
      return next(errorHandler(404, "Course not found!"));
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

//assign instructors to a course
export const assignInstructors = async (req, res, next) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { instructors: req.body.instructors } },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};


// Get course details by course name
export const getCourseByName = async (req, res, next) => {
  try {
    const course = await Course.findOne({ courseName: req.params.name });
    if (!course) {
      return next(errorHandler(404, "Course not found!"));
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Get all courses
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Get all courses by year and semester
export const getCoursesByYearAndSemester = async (req, res, next) => {
  try {
    const courses = await Course.find({
      year: req.params.year,
      semester: req.params.semester,
    });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Get all courses by faculty
export const getCoursesByFaculty = async (req, res, next) => {
  try {
    const courses = await Course.find({ faculty: req.params.faculty });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Get all students who enroll in a course
export const getStudentsByCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("students");
    if (!course) {
      return next(errorHandler(404, "Course not found!"));
    }
    res.status(200).json(course.students);
  } catch (error) {
    next(error);
  }
};

//get assigned courses for a lecturer or instructor
export const getAssignedCourses = async (req, res, next) => {
  const userId = req.user.id; // Assuming user ID is stored in req.user.id
  try {
    // Find courses where the user is included in the lecturers or instructors array
    const courses = await Course.find({
      $or: [
        { lecturers: userId },
        { instructors: userId }
      ]
    });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
// Remove assigned user from a course
export const removeAssignedUser = async (req, res, next) => {
  const { courseId, userId } = req.params;
  const { role } = req.user; 

  try {
    // Check if the user is authorized to remove an assigned user
    if (role !== "Admin") {
      return next(errorHandler(403, "Only Admins can remove assigned users."));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(errorHandler(404, "Course not found!"));
    }

    // Check if the user to be removed is actually assigned to the course
    if (!course.lecturers.includes(userId) && !course.instructors.includes(userId)) {
      return next(errorHandler(400, "User is not assigned to this course."));
    }

    // Remove the user from the appropriate array based on their role
    if (course.lecturers.includes(userId)) {
      course.lecturers.pull(userId);
    }
    if (course.instructors.includes(userId)) {
      course.instructors.pull(userId);
    }

    await course.save();
    res.status(200).json({ message: "Assigned user removed successfully!" });
  } catch (error) {
    next(error);
  }
};


// Student get Enroll in a course
export const enrollCourse = async (req, res, next) => {
  const { enrollmentKey } = req.body;
  const courseId = req.params.id;
  const studentId = req.user.id; 
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return next(errorHandler(404, "Course not found!"));
    }
    if (course.enrollmentKey !== enrollmentKey) {
      return next(errorHandler(400, "Invalid enrollment key!"));
    }
    if (course.students.includes(studentId)) {
      return next(errorHandler(400, "You are already enrolled in this course!"));
    }
    course.students.push(studentId);
    await course.save();

    // Add the enrolled course to the user's enrolledCourses array
    await User.findByIdAndUpdate(
      studentId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );
    res.status(200).json({ message: "Enrolled in course successfully!" });
  } catch (error) {
    next(error);
  }
};



// Get enrolled courses for the current user
export const getEnrolledCourses = async (req, res, next) => {
  const userId = req.user.id; // Assuming user ID is stored in req.user.id
  try {
    const user = await User.findById(userId).populate("enrolledCourses");
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }
    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    next(error);
  }
};

//get available courses for student
export const getAvailableCoursesForStudent = async (req, res, next) => {
  try {
    // Get the student's ID from the request
    const studentId = req.user.id;
    // Retrieve the student's details to get faculty, year, and semester
    const student = await User.findById(studentId);
    // Retrieve courses that match the student's faculty, year, and semester
    const courses = await Course.find({
      faculty: student.faculty,
      year: student.year,
      semester: student.semester,
    });

    // Get the IDs of courses that the student has already enrolled in
    const enrolledCourseIds = student.enrolledCourses.map(course => course.toString());
    // Filter out the enrolled courses
    const availableCourses = courses.filter(course => !enrolledCourseIds.includes(course._id.toString()));
    // Display the available courses to the student
    res.status(200).json(availableCourses);
  } catch (error) {
    next(error);
  }
};
