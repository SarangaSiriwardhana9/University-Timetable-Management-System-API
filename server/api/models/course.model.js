import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    faculty: {
      type: String,
      enum: ["ComputerScience", "Engineering", "Arts", "Science", "Law"],
      required: true,
    },
    year: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
    semester: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    enrollmentKey: {
      type: String,
      required: true,
      unique: true,
    },
    LIC: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lecturers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    instructors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
