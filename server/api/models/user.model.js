import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    universityId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[A-Z]{2}(ST|LC|IN)\d{8}$/.test(v);
        },
        message: props => `${props.value} is not a valid university ID!`
      }
    },
    faculty: {
      type: String,
      enum: ["ComputerScience", "Engineering", "Arts", "Science", "Law"],
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/5951/5951752.png",
    },
    role: {
      type: String,
      enum: ["Admin", "Lecturer", "Instructor", "Student"],
      default: "Student",
    },
    semester: {
      type: Number,
      enum: [1, 2],
      default: null,
    },
    year: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: null,
    },
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
