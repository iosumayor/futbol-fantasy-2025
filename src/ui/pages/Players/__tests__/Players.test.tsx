import { describe, it, afterEach, expect } from "vitest";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { aPlayer } from "@core/domain/___mocks___/aPlayers";
import * as playersService from "@core/services/playersService";
import { renderWithRouter } from "@test-utils/renderWithRouter";
import { Players } from "../Players";

const mockPlayers = [
  aPlayer({ team: "Real Madrid", name: "Modric", position: "Delantero" }),
  aPlayer({
    team: "Barcelona",
    name: "Pedri",
    id: 2,
    position: "Centrocampista",
    image:
      "https://assets.laliga.com/squad/2025/t178/p77318/128x128/p77318_t178_2025_1_002_000.jpg",
    imageDetail:
      "https://r2.thesportsdb.com/images/media/player/render/agtip81658424227.png/small",
  }),
];

function setupPlayersTest(
  data = mockPlayers,
  isLoading = false,
  isError = false,
) {
  vi.spyOn(playersService, "useAllPlayers").mockReturnValue({
    data,
    isLoading,
    isError,
  } as any);
  renderWithRouter(<Players />);
}

describe("en la página de Players", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería permitir filtrar jugadores por nombre", async () => {
    setupPlayersTest();

    await userEvent.type(
      screen.getByPlaceholderText("Filtrar por nombre"),
      "Modric",
    );

    expect(screen.getByText("Modric")).toBeInTheDocument();
    expect(screen.queryByText("Pedri")).not.toBeInTheDocument();
  });

  it("debería permitir filtrar jugadores por equipo", async () => {
    setupPlayersTest();

    await userEvent.click(screen.getByText("Filtrar por equipo"));
    await userEvent.type(
      screen.getByPlaceholderText("Filtrar por equipo"),
      "Barcelona",
    );

    expect(screen.getByText("Pedri")).toBeInTheDocument();
    expect(screen.queryByText("Modric")).not.toBeInTheDocument();
  });

  it("debería permitir filtrar jugadores por posición", async () => {
    setupPlayersTest();

    await userEvent.click(screen.getByText("Filtrar por posición"));
    await userEvent.click(
      screen.getByRole("button", { name: "Centrocampista" }),
    );

    expect(screen.getByText("Pedri")).toBeInTheDocument();
    expect(screen.queryByText("Modric")).not.toBeInTheDocument();
  });

  it("debería permitir ordenar jugadores por precio ascendente y descendente", async () => {
    const playersWithPrice = [
      aPlayer({ name: "Jugador Barato", price: 5 }),
      aPlayer({ name: "Jugador Caro", id: 2, price: 20 }),
    ];
    setupPlayersTest(playersWithPrice);

    const rowsAsc = screen.getAllByRole("row");
    expect(rowsAsc[1]).toHaveTextContent("Jugador Barato");
    expect(rowsAsc[2]).toHaveTextContent("Jugador Caro");

    await userEvent.click(
      screen.getByRole("button", { name: "Ordenar por precio" }),
    );

    const rowsDesc = screen.getAllByRole("row");
    expect(rowsDesc[1]).toHaveTextContent("Jugador Caro");
    expect(rowsDesc[2]).toHaveTextContent("Jugador Barato");
  });

  it("debería mostrar la imagen del jugador si está disponible", () => {
    setupPlayersTest();

    expect(screen.getByRole("img", { name: "Modric" })).toHaveAttribute(
      "src",
      "https://assets.laliga.com/squad/2025/t178/p77318/128x128/p77318_t178_2025_1_002_000.jpg",
    );
    expect(screen.getByRole("img", { name: "Pedri" })).toHaveAttribute(
      "src",
      "https://assets.laliga.com/squad/2025/t178/p77318/128x128/p77318_t178_2025_1_002_000.jpg",
    );
  });

  it("muestra el estado de carga (isLoading)", () => {
    setupPlayersTest(undefined, true, false);

    expect(screen.getByText("Cargando jugadores...")).toBeInTheDocument();
  });

  it("muestra el estado de error (isError)", () => {
    setupPlayersTest(undefined, false, true);

    expect(screen.getByText("Error al cargar jugadores")).toBeInTheDocument();
  });
});
