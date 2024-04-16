import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ["Lecture", "Tutorial", "Practical"],
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
    unique: true,
  },
  resourceIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
    required: true,
  }],
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const Timetable = mongoose.model("TimetableSlot", timetableSchema);
export default Timetable;
