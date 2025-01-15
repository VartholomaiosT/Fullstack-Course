import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({ message: "Login successful!", type: "success" });
    } catch (exception) {
      setNotification({ message: "Wrong credentials", type: "error" });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const CreateForm = () => {
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const newBlog = await blogService.addBlog({
          title: newTitle,
          author: newAuthor,
          url: newUrl,
        });
        setBlogs(blogs.concat(newBlog));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        setNotification({
          message: `a new blog ${newTitle} by ${newAuthor} added`,
          type: "success",
        });
      } catch (exception) {
        setNotification({ message: "Failed to add blog", type: "error" });
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <Notification message={notification.message} type={notification.type} />
        <h1>create new</h1>
        <div>
          Title:{" "}
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          URL:{" "}
          <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    );
  };

  const loginForm = () => (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user && user.name ? user.name : user.username} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      <CreateForm />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogForm()}</div>;
};

export default App;
