const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { createTimestamp } = require("../util/timestamp");
const User = require("../models/user");
const ActiveSession = require("../models/activeSession");

router.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  console.log("user", user);

  if (user.isDisabled) {
    return res.status(401).json({
      error: "User is disabled! Please contact administrator",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  await ActiveSession.destroy({
    where: {
      userId: user.id,
    },
  });

  const session = await ActiveSession.create({
    userId: user.id,
    token,
    expiration: createTimestamp(),
  });

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
    sessionId: session.id,
  });
});

module.exports = router;
