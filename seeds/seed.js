const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample data to seed
const users = [
  {
    username: 'david',
    email: 'david_jones@gmail.com',
    friends: [],
  },
  {
    username: 'joe_smith',
    email: 'joe_smith@example.com',
    friends: [],
  },
  {
    username: 'james',
    email: 'james_snow@example.com',
    friends: [],
  }
];

const thoughts = [
  {
    thoughtText: "Here's a cool thought...",
    username: 'david',
    reactions: [
      { reactionBody: "Well put!", username: "joe_smith" }
    ]
  },
  {
    thoughtText: "Life has its ups and downs...",
    username: 'joe_smith',
    reactions: [
    { reactionBody: "I could not agree more!", username: "james" }
    ]
  },
  {
    thoughtText: "This was a difficult assignment!",
    username: 'james',
    reactions: [
      { reactionBody: "It took me a long time to finish as well.", username: "david" }
    ]
  },
  {
    thoughtText: "This is another thought!",
    username: 'joe_smith',
    reactions: [
      { reactionBody: "I completely agree!", username: "david" }
    ]
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create new users
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded!');

    // Update friends (add user relationships)
    await User.findByIdAndUpdate(createdUsers[0]._id, { $push: { friends: createdUsers[1]._id } });
    await User.findByIdAndUpdate(createdUsers[1]._id, { $push: { friends: createdUsers[0]._id } });
    
    console.log('Friends added!');

    // Create new thoughts
    await Thought.insertMany(thoughts);
    console.log('Thoughts seeded!');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDatabase();
