import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, expect, test } from "vitest";

describe("App Component", () => {
  test("renders heading", async () => {
    render(<App />);
    // Busca solo el h1
    expect(
      await screen.findByRole("heading", { name: /Vite \+ React/ }),
    ).toBeInTheDocument();
  });
});
