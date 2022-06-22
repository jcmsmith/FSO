const router = require("express").Router();

const { tokenExtractor, blogFinder } = require("../util/middleware");
const { Blog, User } = require("../models/");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  //console.log("blogs", JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  console.log("body", req.body);
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  //console.log("Deleting blog", req.blog.toJSON());

  if (req.blog) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
