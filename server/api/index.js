import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import courseRoutes from "./routes/course.route.js";
import classroomRoutes from "./routes/classroom.route.js";
import resourceRoutes from "./routes/resource.route.js";
import timetableRoutes from "./routes/timetable.route.js";
import notificationRoutes from "./routes/notification.route.js";
import announcementRoutes from "./routes/announcement.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB !");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB !", err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is listening on port 3000 !");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/classroom", classroomRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/announcement", announcementRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
