const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;
const describe = require("mocha").describe;
const it = require("mocha").it;
const jwtSigner = require("jsonwebtoken");

require("dotenv").config();

// Unit testing
describe("Comment Unit testing", function () {
  let token = jwtSigner.sign(
    { id: 1, username: "apple" },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );
  it("POST /posts/:id/comments: should be able to post a comment", async function () {
    await request
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first post" });

    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;
    const response = await request
      .post(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first comment" });

    expect(response.status).to.eq(201);
    expect(response.text).to.eq("Success");
  });

  it("GET /posts/:id/comments: should be able to get all comments by a post", async function () {
    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    const response = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.eql(200);
    expect(response.body.length).to.greaterThanOrEqual(1);
  });

  const updatedContent = "This is the updated first comment";
  it("PATCH /posts/:id/comments: should be able to patch a comment by a commenter", async function () {
    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    const commentGet = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentGet.body.filter((i) => i.user_id === 1)[0].id;

    const patchResponse = await request
      .patch(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment_id: commentId, content: updatedContent });

    expect(patchResponse.status).to.eql(200);
    expect(patchResponse.text).to.eq("Success");
  });

  let anotherToken = jwtSigner.sign(
    { id: 2, username: "banana" },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );
  it("PATCH /posts/:id/comments: should NOT be able to patch a comment by another commenter", async function () {
    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    const commentGet = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentGet.body.filter((i) => i.user_id === 1)[0].id;

    const hackedContent = "HACK: This is the updated first comment";
    const patchResponse = await request
      .patch(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .send({ comment_id: commentId, content: hackedContent });

    expect(patchResponse.status).to.eql(403);
    expect(patchResponse.text).to.eq(
      "Cannot patch comment from another commenter",
    );
  });

  it("DELETE /posts/:id/comments: should be able to delete a comment by a commenter", async function () {
    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    const commentGet = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentGet.body.filter((i) => i.user_id === 1)[0].id;

    const deleteResponse = await request
      .delete(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment_id: commentId });

    expect(deleteResponse.status).to.eql(200);
    expect(deleteResponse.text).to.eq("Success");
  });

  it("DELETE /posts/:id/comments: should NOT be able to delete a comment by another commenter", async function () {
    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    await request
      .post(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first comment" });

    const commentGet = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentGet.body.filter((i) => i.user_id === 1)[0].id;

    const deleteResponse = await request
      .delete(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .send({ comment_id: commentId });

    expect(deleteResponse.status).to.eql(403);
    expect(deleteResponse.text).to.eq(
      "Cannot delete comment from another commenter",
    );
  });
});

// End to end testing
describe("Comment End to end testing", function () {
  it("should be able to login, post a comment and get all comments", async function () {
    const token = (
      await request
        .post("/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;

    await request
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first post" });

    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    const postResponse = await request
      .post(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first comment" });

    expect(postResponse.status).to.eql(201);
    expect(postResponse.text).to.eql("Success");

    const getResponse = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).to.eql(200);
    expect(getResponse.body.length).to.greaterThanOrEqual(1);
  });

  const updatedContent = "This is the updated first comment";
  it("should be able to login, update a comment and delete a comment", async function () {
    const token = (
      await request
        .post("/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;

    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    const commentGet = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentGet.body.filter((i) => i.user_id === 1)[0].id;

    const patchResponse = await request
      .patch(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment_id: commentId, content: updatedContent });

    expect(patchResponse.status).to.eql(200);
    expect(patchResponse.text).to.eql("Success");

    const deleteResponse = await request
      .delete(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment_id: commentId });

    expect(deleteResponse.status).to.eql(200);
    expect(deleteResponse.text).to.eql("Success");
  });

  const hackedContent = "HACK: This is the updated first comment";
  it("should be able to login, but NOT update or delete a comment by another commenter", async function () {
    const token = (
      await request
        .post("/login")
        .send({ username: "apple", password: "12345" })
    ).body.token;

    const postGet = await request
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);
    const postId = postGet.body[0].id;

    await request
      .post(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is the first comment" });

    const commentGet = await request
      .get(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentGet.body.filter((i) => i.user_id === 1)[0].id;

    const anotherToken = (
      await request
        .post("/login")
        .send({ username: "banana", password: "67890" })
    ).body.token;

    const patchResponse = await request
      .patch(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .send({ comment_id: commentId, content: hackedContent });

    expect(patchResponse.status).to.eql(403);
    expect(patchResponse.text).to.eql(
      "Cannot patch comment from another commenter",
    );

    const deleteResponse = await request
      .delete(`/posts/${postId}/comments`)
      .set("Authorization", `Bearer ${anotherToken}`)
      .send({ comment_id: commentId });

    expect(deleteResponse.status).to.eql(403);
    expect(deleteResponse.text).to.eql(
      "Cannot delete comment from another commenter",
    );
  });
});
