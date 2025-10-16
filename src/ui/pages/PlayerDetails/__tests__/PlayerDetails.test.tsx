import { describe, it, afterEach, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { PlayerDetails } from "../PlayerDetails";
import { renderWithRouter } from "@test-utils/renderWithRouter";
import * as playersService from "@core/services/playersService";

const mockPlayer = {
  id: 1,
  name: "Modric",
  position: "Centrocampista",
  team: "Real Madrid",
  points: 100,
  price: 50,
  imageDetail: "https://example.com/modric_detail.jpg",
};

function setupPlayerTest(
  data = mockPlayer,
  isLoading = false,
  isError = false,
) {
  vi.spyOn(playersService, "usePlayer").mockReturnValue({
    data,
    isLoading,
    isError,
  } as any);
  renderWithRouter(<PlayerDetails />);
}

describe("en la página de PlayerDetails", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("debería mostrar la información del jugador correctamente", async () => {
    setupPlayerTest();

    expect(await screen.findByText("Modric")).toBeInTheDocument();
    expect(screen.getByText("Equipo: Real Madrid")).toBeInTheDocument();
    expect(screen.getByText("Posición: Centrocampista")).toBeInTheDocument();
    expect(screen.getByText("Puntos: 100")).toBeInTheDocument();
    expect(screen.getByText("Precio: 50")).toBeInTheDocument();
    expect(screen.getByAltText("Modric")).toHaveAttribute(
      "src",
      "https://example.com/modric_detail.jpg",
    );
  });

  it("muestra el estado de carga (isLoading)", () => {
    setupPlayerTest(undefined, true, false);

    expect(
      screen.getByText("Cargando detalles del jugador..."),
    ).toBeInTheDocument();
  });

  it("muestra el estado de error (isError)", () => {
    setupPlayerTest(undefined, false, true);

    expect(
      screen.getByText("Error al cargar detalles del jugador"),
    ).toBeInTheDocument();
  });
});
