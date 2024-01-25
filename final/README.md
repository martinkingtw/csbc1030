Set up the database, give permission to user with root user

```
create database csbc1030;
create user 'martin' @ 'localhost' identified by 'password';
grant all privileges ON csbc1030.* to 'martin'@'localhost';
flush privileges;
```

Run the Express server in assignment8 folder.
Copy .env.example to .env
Install knex globally (if haven't). Then run knex migrations folders.

```
cp .env.example .env
npm ci
npm i knex -g
knex migrate:latest
npm run start
```

Try with the endpoint GET /users without JWT

Try to login the endpoint POST /login in Postman
apple password is 12345, banana password is 67890, candy password is abcde

```
{
    "username": "apple",
    "password": "12345"
}
```

Put the token as the Bearer token in Postman, try the endpoint POST /posts

```
{
    "content": "This is the first post"
}
```

try the endpoint POST /posts/1/comments

```
{
    "content": "This is the first comment"
}
```

Try the endpoint GET /posts to see the first post

Try the endpoint GET /posts/1 to see the post with id 1

Try the endpoint GET /posts/1/comments to see the comments

Find a post with the user id 1, try the endpoint PATCH /posts/:id to update the first post

```
{
    "content": "This is the first updated post"
}
```

Find a comment with the user id 1, try the endpoint PATCH /posts/<post_id>/comments to update the first comment

```
{
    "comment_id": <comment_id>,
    "content": "This is the first updated comment"
}
```

Find a comment with the user id 1, try the endpoint DELETE /posts/<post_id>/comments to delete the first comment

```
{
    "comment_id": <comment_id>
}
```

Try to run format and linter

```
npm run format
npm run lint
```

Try to run test in another terminal. The first terminal must continue to run npm run start.

```
npm run test
```
