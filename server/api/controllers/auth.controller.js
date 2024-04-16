import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


//signup

export const signup = async (req, res, next) => {
  const { universityId, username, email, password, faculty, profilePic } = req.body;
  if (universityId.length !== 12) {
    return next(errorHandler(400, "University ID must be exactly 12 characters long"));
  }
  let role;
  switch (faculty) {
    case "ComputerScience":
      role = universityId.startsWith("CSST") ? "Student" :
             universityId.startsWith("CSLC") ? "Lecturer" :
             universityId.startsWith("CSIN") ? "Instructor" : null;
      break;
    case "Engineering":
      role = universityId.startsWith("EGST") ? "Student" :
             universityId.startsWith("EGLC") ? "Lecturer" :
             universityId.startsWith("EGIN") ? "Instructor" : null;
      break;
    case "Arts":
      role = universityId.startsWith("ARST") ? "Student" :
             universityId.startsWith("ARLC") ? "Lecturer" :
             universityId.startsWith("ARIN") ? "Instructor" : null;
      break;
    case "Science":
      role = universityId.startsWith("SCST") ? "Student" :
             universityId.startsWith("SCLC") ? "Lecturer" :
             universityId.startsWith("SCIN") ? "Instructor" : null;
      break;
    case "Law":
      role = universityId.startsWith("LWST") ? "Student" :
             universityId.startsWith("LWLC") ? "Lecturer" :
             universityId.startsWith("LWIN") ? "Instructor" : null;
      break;
    default:
      role = "Student";
  }
  if (!role) {
    return next(errorHandler(400, "Invalid faculty or university ID format"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ universityId, username, email, password: hashedPassword, role, faculty, profilePic });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully !" });
  } catch (err) {
    next(err);
  }
};

//signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, "User not found!"));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(403, "Wrong credentials!"));

      const tokenPayload = { id: validUser._id, role: validUser.role }; // Include role in the payload
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // cookie for one hour

     
      res.cookie("access_token", token, { httpOnly: true, expires: expiryDate })
          .status(200)
          .json(rest);
  } catch (error) {
      next(error);
  }
};
export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};