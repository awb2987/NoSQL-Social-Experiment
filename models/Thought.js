const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss'), // Format using Day.js
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
  timestamps: true,
});

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Customize the JSON output to format timestamps using Day.js
thoughtSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format('YYYY-MM-DD HH:mm:ss');
    ret.updatedAt = dayjs(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    return ret;
  },
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
