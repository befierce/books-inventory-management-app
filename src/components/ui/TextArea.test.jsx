import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextArea from "./TextArea";

describe("TextArea Component Tests", () => {
  it("should render textarea correctly", () => {
    render(
      <TextArea
        name="description"
        placeholder="Enter description"
        value=""
        onChange={() => {}}
      />
    );

    const textareaElement = screen.getByPlaceholderText("Enter description");
    expect(textareaElement).toBeInTheDocument();
  });

  it("should allow user to type in textarea", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TextArea
        name="comments"
        placeholder="Your comments"
        value=""
        onChange={handleChange}
      />
    );

    const textareaElement = screen.getByPlaceholderText("Your comments");
    await user.type(textareaElement, "This is a test comment");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should display the correct value", () => {
    render(
      <TextArea
        name="bio"
        placeholder="Bio"
        value="Software Developer"
        onChange={() => {}}
      />
    );

    const textareaElement = screen.getByPlaceholderText("Bio");
    expect(textareaElement).toHaveValue("Software Developer");
  });

  it("should display error message when error prop is provided", () => {
    render(
      <TextArea
        name="message"
        placeholder="Message"
        value=""
        onChange={() => {}}
        error="Message is required"
      />
    );

    const errorMessage = screen.getByText("Message is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-400");
  });
});
