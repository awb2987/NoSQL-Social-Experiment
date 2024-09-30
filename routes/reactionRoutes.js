const router = require('express').Router();
const { createReaction, deleteReaction } = require('../controllers/reactionController');

// Route to add reaction to a thought
router.post('/thoughts/:thoughtId/reactions', createReaction);

// Route to delete reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
