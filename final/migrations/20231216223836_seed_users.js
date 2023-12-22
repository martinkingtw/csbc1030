/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex("users").insert([
    {
      id: "1",
      username: "apple",
      hash: "$2b$10$Y6MNKfxH0R8LpdMDRTyHCOtHlw8uQPIphVpeqLEvwX/qaAQBBXw2u",
    },
    {
      id: "2",
      username: "banana",
      hash: "$2b$10$KDCqtqZ5JyVcLDMsgp.NfunxpbRaMIuautRX2dz.Xb.bn58F0f6S.",
    },
    {
      id: "3",
      username: "candy",
      hash: "$2b$10$3OM13QwEWq0AE6sWga/0S.4AVTZZVx/SLPq6rq0XUsTrnQgul0do2",
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex("users").whereIn("id", ["1", "2", "3"]).delete();
};
