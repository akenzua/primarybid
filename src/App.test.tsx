import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders app", async () => {
  render(<App />, { wrapper: BrowserRouter });
  const loginForm = screen.getByRole("form", { name: "login-form" });
  expect(loginForm).toBeInTheDocument();

  const usernameInput = screen.getByRole("textbox", { name: "Username" });
  expect(usernameInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();

  const loginButton = screen.getByRole("button", { name: "Submit" });
  expect(loginButton).toBeInTheDocument();

  fireEvent.change(usernameInput, { target: { value: "mor_2314" } });
  fireEvent.change(passwordInput, { target: { value: "83r5^_" } });
  fireEvent.click(loginButton);

  const categories = await screen.findByRole("heading", { name: "Categories" });
  expect(categories).toBeInTheDocument();
});
