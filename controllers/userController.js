const { User } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // GET a single user based on their ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with the provided ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // DELETE a user based on their ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with the provided ID' })
          : res.json({ message: 'User successfully deleted!' })
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // ADD a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with the provided ID' })
          : res.json({ message: 'Friend successfully added!', user })
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // DELETE a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with the provided ID' })
          : res.json({ message: 'Friend successfully deleted!', user })
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
