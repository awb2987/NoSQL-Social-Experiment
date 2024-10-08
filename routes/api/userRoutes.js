const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// Routes for users
router.route('/').get(getAllUsers).post(createUser)

// Routes for user Id
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// Routes for userId and friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
