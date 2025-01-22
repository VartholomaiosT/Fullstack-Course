import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
  };

  const mockHandler = vi.fn();
  render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
