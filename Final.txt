# Final Project

## Goal

The goal of this project is to build a scalable ExpressJS application that allows users to post and comment on posts. This should be an individual project.
You may begin working on the project at any point however it is designed to be started during the final week.

## Instructions

Create a new branch for this project, branching from the main branch.

Create a REST API ExpressJS application that is connected to a MySQL database. Your application must contain unit and end to end tests for at least 2 routes.

### Endpoints

The application must expose the following endpoints:

#### Unauthenticated

- /users to fetch all users
- /login to return an authentication token for the user. (passwords should NOT be stored in plaintext)

#### Authenticated

The following endpoints all process data relevant to the sender's user id

##### Fetching Data

- GET /posts to fetch all posts by a sender
- GET /posts/:id to fetch a single post made by a sender
- GET /posts/:id/comments to fetch all comments about a post

##### Adding Data

- POST /posts to create a new post
- POST /posts/:id/comments to add a new comment to a post

##### Updating Data

- PATCH /posts/:id to update a post
- PATCH /posts/:id/comments to update a comment

##### Deleting Data

- DELETE /posts/:id/comments to delete a comment

### Files

The samples Folder has 3 files that you will need for this project

Please user the `users.json` file as a list of all users.

Please user the `posts.json` file as a list of all posts.

Please user the `comments.json` file as a list of all comments.

Note that all 3 files were sourced from [JSON Placeholder](https://jsonplaceholder.typicode.com/).

### Code Reuse

You may reuse any and all code you have previously created for this class.

### Submission Instructions

Create a PR from your project branch to the main branch of your repository.

The PR should include all necessary files + a README for instructions on how to run the project.

Submit a link to that PR and the commit ID in the project submission box.
