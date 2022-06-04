const express = require("express");
const router = express.Router();
const redis = require("../redis");
const { getAsync } = require("../redis/index");

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  const count = await getAsync("count");
  const response = { added_todos: parseInt(count) };

  res.send(response);
});

module.exports = router;
