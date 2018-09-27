const db = require("../dbConfig");

module.exports = {
  async getUsers() {
    return await db("Users").select();
  },

  async getUserById(id) {
    return await db("Users").where({ id: id });
  },

  async getUserByUserName(username) {
    return await db("Users")
      .where({ username: username })
      .select();
  },

  async addUser(username, password) {
    return await db(`users`).insert({
      username: username,
      password: password
    });
  },

  async updateUser(id, user) {
    return await db("Users")
      .where({ id: id })
      .update(user);
  },

  async delUser(id) {
    return await db("Users")
      .where({ id: id })
      .del();
  }
};
