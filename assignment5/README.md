Run the Express server in assignment5 folder.

```
npm ci
npm run start
```

Try the endpoint GET /users and /users/:id in Postman or browser

```
localhost:3000/users
localhost:3000/users/1
```

Try the endpoint POST /users in Postman with following JSON body (POST localhost:3000/users)

```
{
    "name": "Flower"
}
```

Try to run format and linter

```
npm run format
npm run lint
```
