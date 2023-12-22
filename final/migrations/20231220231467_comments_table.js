/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id");
    table.integer("user_id").unsigned();
    table.integer("post_id").unsigned();
    table.string("content");
    table.timestamps(true, true);
    table.foreign("user_id").references("users.id");
    table.foreign("post_id").references("posts.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
