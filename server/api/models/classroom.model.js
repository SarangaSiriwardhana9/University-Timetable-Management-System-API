import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const Classroom = mongoose.model("Classroom", classroomSchema);

export default Classroom;
