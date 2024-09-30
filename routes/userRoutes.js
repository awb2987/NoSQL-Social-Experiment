const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../controllers/userController');

// Routes for users
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

// Routes for friends
router.post('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;
