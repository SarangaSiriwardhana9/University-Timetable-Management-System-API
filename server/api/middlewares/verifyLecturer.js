

export const verifyLecturer = (req, res, next) => {
  //console.log('User role:', req.user.role); // Log the user role
  if (req.user.role !== 'Lecturer') {
      return res.status(403).json({ message: 'Unauthorized access: Lecturer role required' });
  }
  next();
};
