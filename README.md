# 18 NoSQL: Social Network API

## Description

This project is a RESTful API for a social network web application where users can share thoughts, react to friends’ thoughts, and manage a friend list. Built with Express.js and MongoDB using Mongoose ODM, this API provides robust features for handling unstructured data efficiently.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost/social_network_api
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Use Insomnia or Postman to test the API routes.

## API Routes

### Users

- **GET** `/api/users`: Retrieve all users.
- **GET** `/api/users/:userId`: Retrieve a single user by ID.
- **POST** `/api/users`: Create a new user.
- **PUT** `/api/users/:userId`: Update a user by ID.
- **DELETE** `/api/users/:userId`: Delete a user by ID.
- **POST** `/api/users/:userId/friends/:friendId`: Add a friend.
- **DELETE** `/api/users/:userId/friends/:friendId`: Remove a friend.

### Thoughts

- **GET** `/api/thoughts`: Retrieve all thoughts.
- **GET** `/api/thoughts/:thoughtId`: Retrieve a single thought by ID.
- **POST** `/api/thoughts`: Create a new thought.
- **PUT** `/api/thoughts/:thoughtId`: Update a thought by ID.
- **DELETE** `/api/thoughts/:thoughtId`: Delete a thought by ID.
- **POST** `/api/thoughts/:thoughtId/reactions`: Create a reaction to a thought.
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction by ID.

## Walkthrough Video

A walkthrough video demonstrating the functionality of the API and all acceptance criteria can be found here: [Walkthrough Video Link](<insert-link-here>).

## License

This project is licensed under the MIT License.

## Acknowledgments

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
