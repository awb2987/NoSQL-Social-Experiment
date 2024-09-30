const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // GET a single thought by the ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought not found with the provided ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // CREATE a new thought
  createThought(req, res) {
    // Basic validation
    if (!req.body.thoughtText || !req.body.username) {
      return res.status(400).json({ message: 'Thought text and username are required.' });
    }

    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought has been created, but user not found' })
          : res.status(200).json({ message: 'Thought has been successfully created!' })
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // UPDATE a thought based on the ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true, runValidators: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with the provided ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // DELETE a thought based on the ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with the provided ID' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'Thought deleted, but associated user not found' });
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
