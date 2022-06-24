module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blog_readinglists");
    await queryInterface.dropTable("reading_lists");
    await queryInterface.dropTable("userReading");
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("users");
  },
};
