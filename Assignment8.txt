# Assignment 8 Testing

## Goal

Introduce Testing to our application to allow us to be able to develop our codebase with peace of mind.

## Starting Point

Use the code created in assignment 7 as a starting point. Prior to the start of this assignment you should have:

```diff
+ Created an ExpressJS application that reads a list of users from a MySQL database and exposes the following routes:

1. GET `/users` that returns all users
2. GET `/users/:id` that returns a user with a specific id if it matches the sender of the request (i.e. Unable to fetch other user's profile)
+ 3. POST `/users` that appends a user to the database only if the request was sent from user id = 1
4. POST `/users/login` that returns an authentication token to be used in future requests.

Your application should have error handling and routing middleware.
Your application should have a clean separation of concerns, and is well structured.
Your application should have authentication and is able to return appropriate HTTP Codes for Authentication and Authorization.
+ Your application should be able to read and write to a database.

```

## Instructions

Create a new branch for this assignment, branching from the prior assignment's branch.

Add unit and End to end tests to cover the authenticated route:
`GET /users/:id`

### Unit Tests

Write 3 unit tests that test the following positive and negative cases:

1. should be able to retrieve my user entity
2. should not be able to retrieve a different user entity and return appropriate error code
3. should not be able to retrieve an entity if not authenticated and return appropriate error code

### End to End Tests

Write 3 End to End tests that test the following positive and negative cases:

1. Should be able to retrieve my user entity
2. should not be able to retrieve a different user entity and return appropriate error code
3. should not be able to retrieve an entity if not authenticated and return appropriate error code

## Submission

Create a PR from your assignment branch to the main branch of your repository.

The PR should include all necessary files + a README for instructions on how to run the assignment.

Submit a link to that PR and the commit ID in the assignment submission box.

### Assignment Continuity Note

If you are unable to finish an assignment and need sample code for the next assignment please reach out to me, and we will discuss the situation.
