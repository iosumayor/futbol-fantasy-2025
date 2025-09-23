import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { describe, expect, test } from "vitest";

describe("App Component", () => {
  test("renders Vite + React heading and increments counter", async () => {
    render(<App />);

    expect(
      screen.getByText((text) => text.includes("Vite + React")),
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /count is/i });
    await userEvent.click(button);
    expect(button).toHaveTextContent("count is 1");
    screen.debug();
  });
});
