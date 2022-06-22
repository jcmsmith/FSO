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

  const token = req.decodedToken;

  if (token && token.id !== null) {
    const user = await User.findByPk(token.id);
    if (!user) {
      throw new Error("User not found");
    }

    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    });
    res.json(blog);
  } else {
    res.status(401).end();
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
