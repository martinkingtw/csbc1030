Set up the database, give permission to user

```
create database csbc1030;
create user 'martin' @ 'localhost' identified by 'password';
grant all privileges ON csbc1030.* to 'martin'@'localhost';
flush privileges;
```

Install knex globally (if haven't). Then run knex migrations folders.

```
npm i knex -g
knex migrate:latest
```

Run the Express server in assignment6 folder.
Copy .env.example to .env

```
cp .env.example .env
npm ci
npm run start
```

Try to login the endpoint POST /users/login in Postman

```
localhost:3000/users/login
{
    "username": "apple",
    "password": "12345"
}
```

Put the token as the Bearer token in Postman, try the endpoint GET /users and /users/1
Cannot access GET /users/2 as it belongs to user banana (password: 67890)

```
localhost:3000/users
localhost:3000/users/1
```

Try the endpoint POST /users in Postman with following JSON body (POST localhost:3000/users)
Only apple can as it has user ID 1, banana cannot.

```
{
    "username": "drew",
    "password": "abcde"
}
```

Try to run format and linter

```
npm run format
npm run lint
```
