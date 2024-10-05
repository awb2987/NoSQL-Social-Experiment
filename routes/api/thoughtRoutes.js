const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

// Routes for thoughts
router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

// Routes for reactions (under thought routes)
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
