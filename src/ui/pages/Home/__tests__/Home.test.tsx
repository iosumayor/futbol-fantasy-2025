import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../../../App";

describe("en el componente NavBar", () => {
  it("muestra la página de inicio por defecto", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
  });

  it("navega a la página de jugadores al hacer click", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Jugadores"));
    expect(
      await screen.findByRole("heading", { name: "Listado Jugadores" }),
    ).toBeInTheDocument();
  });

  it("navega a la página de inicio al hacer click", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Jugadores"));
    expect(
      await screen.findByRole("heading", { name: "Listado Jugadores" }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText("Pagina de Inicio"));
    expect(
      await screen.findByRole("heading", { name: "Home" }),
    ).toBeInTheDocument();
  });
});
