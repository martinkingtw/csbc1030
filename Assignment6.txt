# Assignment 6 -- Authentication & Authorization

## Goal

The goal of this assignment is to introduce authentication and authorization to our application. This allows us to create routes that are restricted from public access.

## Starting Point

Use the code created in assignment 5 as a starting point. Prior to the start of this assignment you should have:

```diff
Created an ExpressJS application that reads a list of users from a file and exposes the following routes:

1. GET `/users` that returns all users
2. GET `/users/:id` that returns a user with a specific id
+ 3. POST `/users` that appends a user to the starting file

+ Your application should have error handling and routing middleware.
+ Your application should have a clean separation of concerns, and is well structured.
```

## Instructions

Create a new branch for this assignment, branching from the prior assignment's branch.

Add Authentication and Authorization to the following routes:

1. POST `/users/login` that returns an authentication token to be used in future requests.

2. GET `/users/:id` that returns a user with a specific id if it matches the sender of the request (i.e. Unable to fetch other user's profile)

3. POST `/users` that appends a user to the starting file only if the request was sent from user id = 1

These routes should return the appropriate error code if the request is unauthenticated or unauthorized.

Use the same users.json from the samples folder.

## Submission

Create a PR from your assignment branch to the main branch of your repository.

The PR should include all necessary files + a README for instructions on how to run the assignment.

Submit a link to that PR and the commit ID in the assignment submission box.

### Assignment Continuity Note

If you are unable to finish an assignment and need sample code for the next assignment please reach out to me, and we will discuss the situation.
