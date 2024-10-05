const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // GET a single thought by the ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found with the provided ID' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // CREATE a new thought
  async createThought(req, res) {
    // Basic validation
    if (!req.body.thoughtText || !req.body.username || !req.body.userId) {
      return res.status(400).json({ message: 'Thought text, username, and user ID are required.' });
    }

    try {
      // Check if user exists prior to creating thought
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.status(201).json({ message: 'Thought has been created successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // UPDATE a thought based on the ID with validation
  async updateThought(req, res) {
    if (!req.body.thoughtText) {
      return res.status(400).json({ message: 'Thought text is required.' });
    }

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with the provided ID' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // DELETE a thought based on the ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with the provided ID' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Thought deleted, but associated user not found' });
      }

      res.json({ message: 'Thought deleted successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
