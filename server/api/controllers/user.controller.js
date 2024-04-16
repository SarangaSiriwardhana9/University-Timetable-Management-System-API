import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


// set semester and year
export const updateSemesterAndYear = async (req, res, next) => {
  const { semester, year } = req.body;
  try {
    // Validate semester and year values
    if (![1, 2].includes(semester)) {
      return res.status(400).json({ message: 'Invalid semester value. Semester must be 1 or 2.' });
    }
    if (![1, 2, 3, 4].includes(year)) {
      return res.status(400).json({ message: 'Invalid year value. Year must be 1, 2, 3, or 4.' });
    }
    // Update the semester and year for the student
    await User.findByIdAndUpdate(
      req.user.id, // Assuming the user id is stored in req.user.id after authentication
      { $set: { semester, year } },
      { new: true }
    );
    res.status(200).json({ message: 'Semester and year updated successfully!' });
  } catch (error) {
    next(error);
  }
};

// update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          profilePic: req.body.profilePic,
          username: req.body.username,
          
          //email: req.body.email,
          //password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
}

