import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

// test("<BlogForm /> updates parent state and calls onSubmit", async () => {
//   const createBlog = vi.fn();
//   const user = userEvent.setup();

//   render(<BlogForm createBlog={createBlog} />);

//   const input = screen.getByRole("textbox");
//   const sendButton = screen.getByText("save");

//   await user.type(input, "testing a form...");
//   await user.click(sendButton);

//   expect(createBlog.mock.calls).toHaveLength(1);
//   expect(createBlog.mock.calls[0][0].content).toBe("testing a form...");

//   console.log(createBlog.mock.calls);
// });

test("<BlogForm /> calls onSubmit with the right details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("Title");
  const inputAuthor = screen.getByPlaceholderText("Author");
  const inputURL = screen.getByPlaceholderText("URL");
  const saveButton = screen.getByText("save");

  await user.type(inputTitle, "Testing Blog Title");
  await user.type(inputAuthor, "Testing Author");
  await user.type(inputURL, "http://example.com");
  await user.click(saveButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Testing Blog Title",
    author: "Testing Author",
    url: "http://example.com",
  });
});
