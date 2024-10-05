const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss'),
  }
},
{
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
});

// Customize the JSON output to format createdAt using Day.js
reactionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format('YYYY-MM-DD HH:mm:ss');
    return ret;
  },
});

module.exports = reactionSchema;
