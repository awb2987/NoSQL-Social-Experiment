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
router.route('/').get(getAllUsers);
router.route('/').post(createUser);

// Routes for user Id
router.route('/:userId').get(getUserById);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);

// Routes for userId and friendId
router.route('/:userId/friends/:friendId').post(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
