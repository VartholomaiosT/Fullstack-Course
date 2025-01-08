const { test, describe, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("assert"); // Add this line

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testblog.com",
    likes: 0,
  };

  const initialResponse = await api.get("/api/blogs");
  const initialBlogs = initialResponse.body;

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogs = response.body;

  assert.strictEqual(blogs.length, initialBlogs.length + 1);

  const contents = blogs.map((blog) => ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  }));
  assert(
    contents.some(
      (blog) =>
        blog.title === newBlog.title &&
        blog.author === newBlog.author &&
        blog.url === newBlog.url &&
        blog.likes === newBlog.likes
    )
  );
});

test("blog posts have id property instead of _id", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];
  assert.strictEqual(blog.id !== undefined, true);
  assert.strictEqual(blog._id === undefined, true);
});

describe("deletion of a blog", () => {
  test("success with status code 204 if id is valid", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToDelete = blogsAtStart.body[0];

    // Ensure the blog to delete exists
    assert(blogToDelete, "No blog available to delete");

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .catch((err) => {
        console.error(
          "Error during delete request:",
          err.response?.body || err
        );
        throw err;
      });

    const blogsAtEnd = await api.get("/api/blogs");
    const blogs = blogsAtEnd.body;

    assert.strictEqual(blogs.length, blogsAtStart.body.length - 1);

    const titles = blogs.map((blog) => blog.title);
    assert(!titles.includes(blogToDelete.title));
  });
});

describe("blog posts update", () => {
  test("success with status code 200 if id is valid", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToUpdate = blogsAtStart.body[0];

    const updatedBlog = {
      title: "Updated Title",
      author: "Updated Author",
      url: "http://updatedblog.com",
      likes: 10,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);
  });
});
after(async () => {
  await mongoose.connection.close();
});
