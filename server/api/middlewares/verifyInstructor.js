

export const verifyInstructor = (req, res, next) => {
  //console.log('User role:', req.user.role); // Log the user role
  if (req.user.role !== 'Instructor') {
      return res.status(403).json({ message: 'Unauthorized access: Instructor role required' });
  }
  next();
};
