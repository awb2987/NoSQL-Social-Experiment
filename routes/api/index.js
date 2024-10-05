const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Use the user and thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
