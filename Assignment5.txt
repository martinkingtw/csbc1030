# Assignment 5 -- ExpressJS Modules

## Goal

The goal of this assignment is to add error handling and routing middleware and to allow us to append users to the file. It will also introduce a clean structure that will allow us to have a solid foundation to build upon.

## Starting Point

Use the code created in assignment 4 as a starting point. Prior to the start of this assignment you should have:

```diff
+ Created an ExpressJS application that reads a list of users from a file and exposes the following routes:
+ 1. GET `/users` that returns all users
+ 2. GET `/users/:id` that returns a user with a specific id
```

## Instructions

Create a new branch for this assignment, branching from the prior assignment's branch.

Add a third route to the application:

1. POST `/users` that appends a user to the starting file

Modify the existing application to add error handling and routing middleware.

Modify your application to have a clean separation of concerns. You may split your application either by feature or by type.

Add support for linting to this application using eslint and prettier.

to install eslint and prettier:

`npm i --save-dev eslint`
`npm i --save-dev prettier`

The configuration to be used for this class will be found in the samples folder, place those at the root directory.

add the following scripts to your package.json under scripts :

```JSON
    "format": "prettier --write .",
    "lint": "eslint . ",
    "lint:fix": "eslint . --fix "
```

run the scripts to format your code and find linting errors.

`npm run format`
`npm run lint`
`npm run lint:fix`

Fix all linting errors and make sure your code is formatted in this submission.

Use the same users.json from the samples folder.

## Submission

Create a PR from your assignment branch to the main branch of your repository.

The PR should include all necessary files + a README for instructions on how to run the assignment.

Submit a link to that PR and the commit ID in the assignment submission box.

### Assignment Continuity Note

If you are unable to finish an assignment and need sample code for the next assignment please reach out to me, and we will discuss the situation.
