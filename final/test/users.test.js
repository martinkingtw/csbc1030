const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;
const describe = require("mocha").describe;
const it = require("mocha").it;

require("dotenv").config();

describe("GET /users", function () {
  it("should be able to get all users", async function () {
    const response = await request.get("/users");

    expect(response.status).to.eql(200);
    expect(response.body.length).to.greaterThanOrEqual(0);
  });
});
