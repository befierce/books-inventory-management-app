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

  it("should allow user to type in input", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Input
        name="username"
        placeholder="Username"
        value=""
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Username");
    await user.type(inputElement, "John");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should display the correct value", () => {
    render(
      <Input name="name" placeholder="Name" value="Rahul" onChange={() => {}} />
    );

    const inputElement = screen.getByPlaceholderText("Name");
    expect(inputElement).toHaveValue("Rahul");
  });

  it("should display error message when error prop is provided", () => {
    render(
      <Input
        name="email"
        placeholder="Email"
        value=""
        onChange={() => {}}
        error="Email is required"
      />
    );

    const errorMessage = screen.getByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-400");
  });

  it("should not display error message when error prop is not provided", () => {
    render(
      <Input name="email" placeholder="Email" value="" onChange={() => {}} />
    );

    const errorMessage = screen.queryByText(/required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("should render correct input type", () => {
    render(
      <Input
        name="password"
        placeholder="Password"
        value=""
        onChange={() => {}}
        type="password"
      />
    );

    const inputElement = screen.getByPlaceholderText("Password");
    expect(inputElement).toHaveAttribute("type", "password");
  });
   it('should have correct name attribute', () => {
    render(
      <Input 
        name="userEmail" 
        placeholder="Email" 
        value="" 
        onChange={() => {}} 
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Email');
    expect(inputElement).toHaveAttribute('name', 'userEmail');
  });
});
