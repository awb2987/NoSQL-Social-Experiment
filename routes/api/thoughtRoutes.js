const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Routes for thoughts
router.route('/').get(getAllThoughts);
router.route('/').post(createThought);

// Routes for thoughts by ID
router.route('/:thoughtId').get(getThoughtById);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);

// Routes for reactions post by ID
router.route('/:thoughtId/reactions').post(createReaction);

// Routes for reactions delete by ID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
