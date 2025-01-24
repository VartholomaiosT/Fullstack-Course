import React from "react";
import Notification from "./Notification";
import Togglable from "./Togglable";
import CreateForm from "./CreateForm";
import Blog from "./Blog";

const BlogForm = ({
  user,
  handleLogout,
  notification,
  blogs,
  setBlogs,
  setNotification,
  createFormRef,
  handleDelete,
}) => {
  const sortedBlogs = blogs
    .slice()
    .sort((a, b) => (b.likes || 0) - (a.likes || 0));

  console.log("Sorted blogs:", sortedBlogs);

  return (
    <div>
      <h2>blogs</h2>
      <p>{user && user.name ? user.name : user.username} logged-in</p>
      <button id="logout" onClick={handleLogout}>
        logout
      </button>
      <Notification message={notification.message} type={notification.type} />
      <Togglable buttonLabel="new blog" ref={createFormRef}>
        <CreateForm
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
          createFormRef={createFormRef}
        />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BlogForm;
