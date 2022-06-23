module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blog_readinglist");
    await queryInterface.dropTable("reading_list");
    await queryInterface.dropTable("blogs");
    await queryInterface.dropTable("users");
  },
};
