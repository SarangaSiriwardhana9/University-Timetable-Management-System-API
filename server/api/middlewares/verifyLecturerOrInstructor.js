
export const verifyLecturerOrInstructor = (req, res, next) => {
    if (req.user.role === "Lecturer" || req.user.role === "Instructor") {
      return next();
    }
    return res.status(403).json({ message: "Access denied. Only lecturers and instructors allowed." });
  };

  
  