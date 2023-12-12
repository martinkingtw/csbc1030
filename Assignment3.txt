# Assignment 3 -- FS & Promises

## Goal

The goal of this assignment is to test your understanding of Promises and of the NodeJS Filesystem.

## Instructions

Create a new branch for this assignment, branching from the main branch.

Create a program that uses the async/await syntax to:

1. Read an array of numbers from a JSON file
2. Multiply them by two
3. Write them to a new file

Two sample files can be found in the samples folder a `sample_input_numbers.json` and a `sample_output_numbers.json`. The files should be used to understand the structure and to provide a basic test vector for your development.
When reading JSON files be sure to use the `JSON.parse()` and the `JSON.stringify()` to convert the input data.

Your program should be able to handle an arbitrary length input file, and NOT just be hardcoded to the length of the array of the sample input file.

You do not need to handle the case where anything other than valid JSON numbers are input.

## Submission

Create a PR from your assignment branch to the main branch of your repository.

The PR should include all necessary files + a README for instructions on how to run the functions.

Submit a link to that PR and the commit ID in the assignment submission box.
