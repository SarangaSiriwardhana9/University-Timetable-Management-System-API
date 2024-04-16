

export const verifyStudent = (req, res, next) => {
  //console.log('User role:', req.user.role); // Log the user role
  if (req.user.role !== 'Student') {
      return res.status(403).json({ message: 'Unauthorized access: Student role required' });
  }
  next();
};
