import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input Component Tests", () => {
  it("should render input field correctly", () => {
    render(
      <Input
        name="email"
        placeholder="Enter email"
        value=""
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter email");
    expect(inputElement).toBeInTheDocument();
  });
});
