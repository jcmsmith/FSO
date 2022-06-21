require("dotenv").config();
const express = require("express");

const Blog = require("./models/blog");

const app = express();

Blog.sync();

app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log("blogs", JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  console.log("body", req.body);
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByPk(id);

  console.log("Deleting blog", blog.toJSON());

  if (blog) {
    await Blog.destroy({
      where: {
        id,
      },
    });
    return res.status(204);
  } else {
    return res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
