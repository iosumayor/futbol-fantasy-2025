import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { aPlayer } from "@core/domain/___mocks___/aPlayers";
import { aLiga } from "@core/domain/___mocks___/aLigas";
import { renderWithRouter } from "@test-utils/renderWithRouter";
import * as playersService from "@core/services/playersService";
import * as ligaService from "@core/services/ligasService";
import { MercadoJugadores } from "../MercadoJugadores";

const mockPlayers = [
  aPlayer({
    team: "Real Madrid",
    name: "Modric",
    position: "Delantero",
    id: 1,
  }),
  aPlayer({
    team: "Barcelona",
    name: "Pedri",
    id: 2,
    position: "Centrocampista",
  }),
];

const mockLiga = {
  ...aLiga(),
  name: "La Liga",
};

function setupServicesMocks({
  players = mockPlayers,
  liga = mockLiga,
  playersLoading = false,
  playersError = false,
  ligaLoading = false,
  ligaError = false,
} = {}) {
  vi.spyOn(playersService, "useAllPlayers").mockReturnValue({
    data: players,
    isLoading: playersLoading,
    isError: playersError,
  } as any);
  vi.spyOn(ligaService, "useLigaById").mockReturnValue({
    data: liga,
    isLoading: ligaLoading,
    isError: ligaError,
  } as any);
  renderWithRouter(<MercadoJugadores />);
}

describe("en el Mercado de Jugadores", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería renderizar el componente MercadoJugadores correctamente", () => {
    setupServicesMocks();

    expect(screen.getByText(/Mercado de Jugadores de/i)).toBeInTheDocument();
    expect(screen.getByText("Modric")).toBeInTheDocument();
    expect(screen.getByText("Pedri")).toBeInTheDocument();
  });

  it("debería mostrar el estado de carga (isLoading)", () => {
    setupServicesMocks({ playersLoading: true, ligaLoading: true });

    expect(
      screen.getByText("Cargando mercado de jugadores..."),
    ).toBeInTheDocument();
  });

  it("debería mostrar el estado de error (isError)", () => {
    setupServicesMocks({ playersError: true, ligaError: true });

    expect(
      screen.getByText("Error al cargar el mercado de jugadores"),
    ).toBeInTheDocument();
  });

  it("debería abrir el modal al hacer clic en 'Fichar'", async () => {
    setupServicesMocks();

    const modricItem = screen.getByText("Modric").closest("li");
    const ficharButton = modricItem?.querySelector("button");
    ficharButton?.click();

    expect(
      await screen.findByText("¿Quieres fichar a Modric?"),
    ).toBeInTheDocument();
  });

  it("debería cerrar el modal al hacer clic en 'Volver atrás'", async () => {
    setupServicesMocks();

    const modricItem = screen.getByText("Modric").closest("li");
    const ficharButton = modricItem?.querySelector("button");
    ficharButton?.click();
    const volverAtrasButton = await screen.findByText("Volver atrás");
    volverAtrasButton.click();

    expect(
      await screen.findByText("¿Quieres fichar a Modric?"),
    ).not.toBeInTheDocument();
  });
});
