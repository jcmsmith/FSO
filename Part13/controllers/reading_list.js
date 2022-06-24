const router = require("express").Router();

const { BlogReadinglist, ReadingList } = require("../models");

router.post("/", async (req, res) => {
  const list = await ReadingList.create({
    userId: req.body.userId,
  });

  await BlogReadinglist.create({
    readingListId: list.dataValues.id,
    blogId: req.body.blogId,
  });

  res.status(201).end();
});

module.exports = router;
