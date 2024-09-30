const { Thought } = require('../models');

const reactionController = {
  // CREATE a reaction
  createReaction(req, res) {
    // Basic validation
    if (!req.body.reactionBody || !req.body.username) {
      return res.status(400).json({ message: 'Reaction body and username are required.' });
    }

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
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

  // DELETE a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
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
};

module.exports = reactionController;
