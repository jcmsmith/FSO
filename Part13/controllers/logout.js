const router = require("express").Router();

const ActiveSession = require("../models/activeSession");

router.post("/", async (req, res) => {
  await ActiveSession.destroy({
    where: {
      userId: req.user.id,
    },
  });

  res.status(200).end();
});

module.exports = router;
