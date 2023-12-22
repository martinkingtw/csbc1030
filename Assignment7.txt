# Assignment 7 -- Database

## Goal

Introduce a database to our application, this will allow us to simplify our codebase and allow us to scale.

## Starting Point

Use the code created in assignment 6 as a starting point. Prior to the start of this assignment you should have:

```diff
Created an ExpressJS application that reads a list of users from a file and exposes the following routes:

1. GET `/users` that returns all users
+ 2. GET `/users/:id` that returns a user with  a specific id if it matches the sender of the request (i.e. Unable to fetch other user's profile)
+ 3. POST `/users` that appends a user to the starting file  only if the request was sent from user id = 1
+ 4. POST `/users/login` that returns an authentication token to be used in future requests.

Your application should have error handling and routing middleware.
Your application should have a clean separation of concerns, and is well structured.
+ Your application should have authentication and is able to return appropriate HTTP Codes for Authentication and Authorization.

```

## Instructions

Create a new branch for this assignment, branching from the prior assignment's branch.

Instead of reading and writing users from a users.json file, modify the application to read and write the users from a local MySQL database using an ORM (Sequelize) or an SQL Builder (Knex.js).

The functionality provided by the existing routes should not be affected.

The columns in the database should match the user properties from the users.json that are found in the samples folder without including the nested properties (address ,company).

## Submission

Create a PR from your assignment branch to the main branch of your repository.

The PR should include all necessary files + a README for instructions on how to run the assignment.

Submit a link to that PR and the commit ID in the assignment submission box.

### Assignment Continuity Note

If you are unable to finish an assignment and need sample code for the next assignment please reach out to me, and we will discuss the situation.
