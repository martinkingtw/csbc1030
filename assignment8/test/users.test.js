const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;
const describe = require("mocha").describe;
const it = require("mocha").it;
const jwtSigner = require("jsonwebtoken");

require("dotenv").config();

// Unit testing
describe("Unit testing: GET /users/:id", function () {
  it("should be able to retrieve my user entity", async function () {
    // Generate user token
    const token = jwtSigner.sign(
      { id: 1, username: "apple" },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(200);
    expect(response.body[0].length).to.eql(1);
    expect(response.body[0][0].id).to.eql(1);
    expect(response.body[0][0].username).to.eql("apple");
  });

  it("should not be able to retrieve a different user entity and return appropriate error code", async function () {
    // Generate user token
    const token = jwtSigner.sign(
      { id: 1, username: "apple" },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    const response = await request
      .get("/users/2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(403);
    expect(response.text).to.eql("Cannot fetch other user's profile");
  });

  it("should not be able to retrieve an entity if not authenticated and return appropriate error code", async function () {
    const response = await request.get("/users/1");

    expect(response.status).to.eql(401);
    expect(response.text).to.eql("Invalid JWT");
  });
});

// End to end testing
describe("End to end testing: GET /users/:id", function () {
  it("should be able to retrieve my user entity", async function () {
    const token = (
      await request
        .post("/users/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(200);
    expect(response.body[0].length).to.eql(1);
    expect(response.body[0][0].id).to.eql(1);
    expect(response.body[0][0].username).to.eql("apple");
  });

  it("should not be able to retrieve a different user entity and return appropriate error code", async function () {
    const token = (
      await request
        .post("/users/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;
    const response = await request
      .get("/users/2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(403);
    expect(response.text).to.eql("Cannot fetch other user's profile");
  });

  it("should not be able to retrieve an entity if not authenticated and return appropriate error code", async function () {
    const response = await request.get("/users/1");

    expect(response.status).to.eql(401);
    expect(response.text).to.eql("Invalid JWT");
  });
});
