

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  timetableSlotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimetableSlot",
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

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
