const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find()
        .sort({ createdAt: -1 });

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // GET a single thought by the ID
  async getThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with the provided ID' });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // CREATE a new thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);

      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'Thought created, but no user with the provided ID' });
      }

      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // UPDATE a thought based on the ID with validation
  async updateThought(req, res) {
    const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

    if (!thoughtData) {
      return res.status(404).json({ message: 'No thought found with the provided ID!' });
    }

    res.json(thoughtData);

    console.log(err);
    res.status(500).json(err);
  },
  // DELETE a thought based on the ID
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought found with the provided ID!' });
      }

      // DELETE a thought ID from user thoughts field
      const userData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: 'Thought created, but no user with this provided ID found!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // CREATE a reaction to a thought
  async createReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with the provided ID!' });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with the provided ID!' });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
