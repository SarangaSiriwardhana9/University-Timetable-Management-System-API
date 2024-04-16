
export const verifyLecturerOrAdmin = (req, res, next) => {
    if (req.user.role === "Lecturer" || req.user.role === "Admin") {
      return next();
    }
    return res.status(403).json({ message: "Access denied. Only lecturers and Admins allowed." });
  };

  
  