import { render, screen } from "@testing-library/react";
import { Loading } from "../Loading";

test("renders loading component", async () => {
  render(<Loading />);
  const loadingText = screen.getByText("Loading...");
  expect(loadingText).toBeInTheDocument();
});
