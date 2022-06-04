const express = require("express");
const { Todo } = require("../mongo");
const redis = require("../redis");
const { getAsync, setAsync } = require("../redis/index");

const router = express.Router();
router.use(express.json());

setAsync("count", 0);

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const count = await getAsync("count");
  await setAsync("count", parseInt(count) + 1);

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(req.todo._id, req.body);
  if (result) {
    res.status(201).send(result);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
