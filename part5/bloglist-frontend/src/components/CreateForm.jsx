import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateForm = ({ blogs, setBlogs, setNotification, createFormRef }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => setNewTitle(event.target.value);
  const handleAuthorChange = (event) => setNewAuthor(event.target.value);
  const handleUrlChange = (event) => setNewUrl(event.target.value);

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };
      // Assuming blogService.create is a function that sends a POST request to create a new blog
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setNotification({
        message: `A new blog "${newTitle}" by ${newAuthor} added`,
        type: "success",
      });
      createFormRef.current.toggleVisibility();
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    } catch (error) {
      setNotification({
        message: "Failed to create a new blog",
        type: "error",
      });
    }
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="Title"
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder="Author"
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={newUrl}
            onChange={handleUrlChange}
            placeholder="URL"
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default CreateForm;
