const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
  timestamps: true,
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Customize the JSON output to format timestamps using Day.js
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format('YYYY-MM-DD HH:mm:ss');
    ret.updatedAt = dayjs(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    return ret;
  },
});

const User = model('User', userSchema);

module.exports = User;
