const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ["userId"] } },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Blog,
        as: "blogsCreated",
        attributes: {
          exclude: ["userId"],
        },
      },
      {
        model: Blog,
        as: "blogsReading",
        attributes: {
          exclude: [""],
        },
        through: {
          attributes: ["isRead", "id"],
        },
      },
    ],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const newUsername = req.body.username;
  const user = await User.findOne({ username: req.params.username });

  if (user) {
    user.username = newUsername;
    await user.save();
    res.status(201).end();
  }

  res.status(404).end();
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
