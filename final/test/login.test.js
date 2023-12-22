const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;
const describe = require("mocha").describe;
const it = require("mocha").it;

require("dotenv").config();

describe("POST /login", function () {
  it("should be able to login", async function () {
    const response = await request
      .post("/login")
      .send({ username: "apple", password: "12345" });

    expect(response.status).to.eql(200);
    expect(response.body.token).not.eq(null);
  });
});
