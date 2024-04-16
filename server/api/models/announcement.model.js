import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
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
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;
