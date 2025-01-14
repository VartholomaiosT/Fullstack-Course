const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user._id, // Ensure user is correctly referenced
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save({ validateModifiedOnly: true });

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndRemove(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "malformatted id" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: "blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = blogsRouter;
