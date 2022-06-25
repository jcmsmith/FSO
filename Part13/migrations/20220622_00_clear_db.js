module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blog_readinglists");
    await queryInterface.dropTable("reading_lists");
    await queryInterface.dropTable("user_readings");
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("active_sessions");
    await queryInterface.dropTable("users");
  },
};
