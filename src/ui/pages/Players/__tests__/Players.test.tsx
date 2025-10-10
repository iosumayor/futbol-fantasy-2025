import { describe, it, afterEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { aPlayer } from "@core/domain/___mocks___/aPlayers";
import * as playersService from "@core/services/playersService";
import { renderWithRouter } from "@test-utils/renderWithRouter";
import { Players } from "../Players";

describe("en la página de Players", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería permitir filtrar jugadores por nombre", async () => {
    vi.spyOn(playersService, "usePlayers").mockReturnValue({
      data: [
        aPlayer({ team: "Real Madrid", name: "Modric" }),
        aPlayer({ team: "Barcelona", name: "Pedri", id: 2 }),
      ],
      isLoading: false,
      isError: false,
    } as any);

    renderWithRouter(<Players />);

    await userEvent.type(
      screen.getByPlaceholderText("Filtrar por nombre"),
      "Modric",
    );

    expect(screen.getByText("Modric")).toBeInTheDocument();
    expect(screen.queryByText("Pedri")).not.toBeInTheDocument();
  });

  it("muestra el estado de carga (isLoading)", () => {
    vi.spyOn(playersService, "usePlayers").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    render(<Players />);
    expect(screen.getByText("Cargando jugadores...")).toBeInTheDocument();
  });

  it("muestra el estado de error (isError)", () => {
    vi.spyOn(playersService, "usePlayers").mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any);

    render(<Players />);
    expect(screen.getByText("Error al cargar jugadores")).toBeInTheDocument();
  });
});
