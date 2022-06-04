const express = require("express");
const router = express.Router();
const redis = require("../redis");
const { getAsync, setAsync } = require("../redis/index");

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
  const response = await getAsync("count");
  let count = parseInt(response);

  if (isNaN(count) || typeof count !== "number") {
    await setAsync("count", 0);
    count = 0;
  }

  const data = { added_todos: count };

  res.send(data);
});

module.exports = router;
