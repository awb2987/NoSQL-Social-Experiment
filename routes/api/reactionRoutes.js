const router = require('express').Router();
const { createReaction, deleteReaction } = require('../../controllers/reactionController');

// Route to add a reaction to a thought
router.post('/:thoughtId', createReaction);

// Route to delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
