const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;
const describe = require("mocha").describe;
const it = require("mocha").it;
const jwtSigner = require("jsonwebtoken");

require("dotenv").config();

// Unit testing
describe("Post Unit testing", function () {
  let token = jwtSigner.sign(
    { id: 1, username: "apple" },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );
  it("POST /posts: should be able to post a post", async function () {
    const response = await request
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first post" });

    expect(response.status).to.eq(201);
    expect(response.text).to.eq("Success");
  });

  it("GET /posts: should be able to get all posts by a poster", async function () {
    const response = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(200);
    expect(response.body.length).to.greaterThanOrEqual(1);
  });

  it("GET /posts/:id: should be able to get a post by a poster", async function () {
    const response = await request
      .get(`/posts/1`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eq(1);
    expect(response.body[0].id).to.eq(1);
  });

  const updatedContent = "This is the updated first post";
  it("PATCH /posts/:id: should be able to patch a post by a poster", async function () {
    const getResponse = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

    const postId = getResponse.body[0].id;
    const patchResponse = await request
      .patch(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: updatedContent });

    expect(patchResponse.status).to.eql(200);
    expect(patchResponse.text).to.eq("Success");

    const response = await request
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eq(1);
    expect(response.body[0].id).to.eq(postId);
    expect(response.body[0].content).to.eq(updatedContent);
  });

  let anotherToken = jwtSigner.sign(
    { id: 2, username: "banana" },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );
  it("PATCH /posts/:id: should NOT be able to patch a post by another poster", async function () {
    const getResponse = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

    const postId = getResponse.body[0].id;
    const hackedContent = "HACK: This is the updated first post";
    const patchResponse = await request
      .patch(`/posts/${postId}`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .send({ content: hackedContent });

    expect(patchResponse.status).to.eql(403);
    expect(patchResponse.text).to.eq("Cannot patch post from another poster");

    const response = await request
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eq(1);
    expect(response.body[0].id).to.eq(postId);
    expect(response.body[0].content).to.eq(updatedContent);
  });
});

// End to end testing
describe("Post End to end testing", function () {
  it("should be able to login, post a post and get all posts", async function () {
    const token = (
      await request
        .post("/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;

    const postResponse = await request
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first post" });

    expect(postResponse.status).to.eql(201);
    expect(postResponse.text).to.eql("Success");

    const getResponse = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).to.eql(200);
    expect(getResponse.body.length).to.greaterThanOrEqual(1);
  });

  const updatedContent = "This is the updated first post";
  it("should be able to login, update a post and get a post", async function () {
    const token = (
      await request
        .post("/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;

    const getResponse = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

    const postId = getResponse.body[0].id;

    const patchResponse = await request
      .patch(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: updatedContent });

    expect(patchResponse.status).to.eql(200);
    expect(patchResponse.text).to.eql("Success");

    const getResponseTwo = await request
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponseTwo.status).to.eql(200);
    expect(getResponseTwo.body.length).to.greaterThanOrEqual(1);
    expect(getResponseTwo.body[0].id).to.eq(postId);
    expect(getResponseTwo.body[0].content).to.eq(updatedContent);
  });

  it("should be able to login, but not update another poster post", async function () {
    const token = (
      await request
        .post("/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;

    const getResponse = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

    const postId = getResponse.body[0].id;

    const anotherToken = (
      await request
        .post("/login")
        .send({ username: "banana", password: "67890" })
    ).body.token;

    const hackedContent = "HACK: This is the updated first post";
    const patchResponse = await request
      .patch(`/posts/${postId}`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .send({ content: hackedContent });

    expect(patchResponse.status).to.eql(403);
    expect(patchResponse.text).to.eq("Cannot patch post from another poster");

    const getResponseTwo = await request
      .get(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponseTwo.status).to.eql(200);
    expect(getResponseTwo.body.length).to.greaterThanOrEqual(1);
    expect(getResponseTwo.body[0].id).to.eq(postId);
    expect(getResponseTwo.body[0].content).to.eq(updatedContent);
  });
});
