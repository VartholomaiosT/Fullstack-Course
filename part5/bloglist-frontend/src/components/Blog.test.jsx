import { render, screen, waitFor } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders title and author but not URL or likes by default", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Author",
    url: "http://example.com",
    likes: 5,
  };

  render(<Blog blog={blog} />);

  // Check that title and author are rendered
  const titleAuthorElement = screen.getByText(
    "Component testing is done with react-testing-library Author"
  );
  expect(titleAuthorElement).toBeDefined();

  // Check that URL and likes are not rendered by default
  const urlElement = screen.queryByText("http://example.com");
  const likesElement = screen.queryByText("likes 5");
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});

test("check URL and likes are shown when view button is clicked"),
  async () => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "Author",
      url: "http://example.com",
      likes: 5,
    };
    const mockHandler = vi.fn();
    render(<Blog blog={blog} toggleVisibility={mockHandler} />);

    const button = screen.getByText("view");
    await user.click(button);
    const urlElement = screen.queryByText("http://example.com");
    const likesElement = screen.queryByText("likes 5");
    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
  };
test("check like button clicked twice calls event handler twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Author",
    url: "http://example.com",
    likes: 5,
  };
  const mockHandler = vi.fn();
  render(<Blog blog={blog} handleLike={mockHandler} />);

  const button = screen.getByText("view");
  await userEvent.click(button);

  const likeButton = screen.getByText("like");
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
