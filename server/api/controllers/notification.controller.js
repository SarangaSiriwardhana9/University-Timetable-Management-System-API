// controllers/notification.controller.js

import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

// Get notifications for a user
export const getNotificationsByUser = async (req, res, next) => {
  const user = req.user.id;
  console.log(user);
  try {
    //get users faculty, year and semester
    const { faculty, year, semester
    } = await User.findById(user);
    //get notifications for the user
    const notifications = await Notification.find({
      faculty,
      year,
      semester,
    }).sort({ createdAt: -1 });
    
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// Set notification as 
export const setNotificationAsRead = async (req, res, next) => {
  const notificationId = req.params.notificationId;

  try {
    const notification = await Notification.findById(notificationId);
    notification.read = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
}

//get all notifications for admin
export const getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// create a custom notification
export const createCustomNotification = async (req, res, next) => {
  const { message, timetableSlotId, faculty, year, semester } = req.body;
  try {
    const notification = new Notification({
      message,
      timetableSlotId,
      faculty,
      year,
      semester,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

//delete Notification
export const deleteNotification = async (req, res, next) => {
  const notificationId = req.params.notificationId;
  try {
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    next(error);
  }
};