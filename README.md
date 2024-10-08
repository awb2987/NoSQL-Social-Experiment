# NOSQL-Social-Experiment

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Routes](#api-routes)
- [Walkthrough Video](#walkthrough-video)
- [Links](#links)

## Description

This project is an API for a social network web application built using Express.js and MongoDB. It allows users to share their thoughts, react to friends' thoughts, and manage a friend list. The API supports creating, updating, and deleting users, thoughts, and reactions.

## User Story

As a social media startup, I want an API for my social network that uses a NoSQL database so that my website can handle large amounts of unstructured data.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/awb2987/NoSQL-Social-Experiment
   cd social-network-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with your MongoDB URI:
   ```plaintext
   MONGODB_URI=mongodb://localhost/social_network_api
   ```

4. Start the application:
   ```bash
   npm start
   ```

## API Routes

- **Users**
  - `GET /api/users` - Retrieve all users
  - `GET /api/users/:userId` - Retrieve a single user by ID
  - `POST /api/users` - Create a new user
  - `PUT /api/users/:userId` - Update a user by ID
  - `DELETE /api/users/:userId` - Delete a user by ID
  - `POST /api/users/:userId/friends/:friendId` - Add a friend
  - `DELETE /api/users/:userId/friends/:friendId` - Remove a friend

- **Thoughts**
  - `GET /api/thoughts` - Retrieve all thoughts
  - `GET /api/thoughts/:thoughtId` - Retrieve a single thought by ID
  - `POST /api/thoughts` - Create a new thought
  - `PUT /api/thoughts/:thoughtId` - Update a thought by ID
  - `DELETE /api/thoughts/:thoughtId` - Delete a thought by ID
  - `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
  - `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Walkthrough Video

[Watch the walkthrough video here](https://www.example.com/your-video-link)
[Backup video walkthrough tutorial link](example.com)

## Links

- [GitHub Repository](https://github.com/awb2987/NoSQL-Social-Experiment)
