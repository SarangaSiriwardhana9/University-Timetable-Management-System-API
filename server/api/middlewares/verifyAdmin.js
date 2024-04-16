

export const verifyAdmin = (req, res, next) => {
  //console.log('User role:', req.user.role); // Log the user role
  if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized access: Admin role required' });
  }
  next();
};
