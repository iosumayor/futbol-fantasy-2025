import { renderWithRouter } from "@test-utils/renderWithRouter";
import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MiPlantilla } from "../MiPlantilla";
import * as miPlantillaService from "@core/services/miPlantillaService";
import { aMiPlantilla } from "@core/domain/___mocks___/aMiPlantilla";

describe("en el la pagina de mi plantilla", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra correctamente los jugadores en la plantilla", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: aMiPlantilla(),
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiPlantilla />);

    expect(screen.getByText("Mi plantilla")).toBeInTheDocument();
    expect(screen.getByText("Jugador 1")).toBeInTheDocument();
    expect(screen.getByText("Jugador 2")).toBeInTheDocument();
  });

  it("muestra el estado de carga, (isLoading)", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as any);
    renderWithRouter(<MiPlantilla />);

    expect(screen.getByText("Cargando plantilla...")).toBeInTheDocument();
  });

  it("muestra el estado de error, (isError)", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any);
    renderWithRouter(<MiPlantilla />);

    expect(
      screen.getByText("Error al cargar la plantilla"),
    ).toBeInTheDocument();
  });

  it("los jugadores están ordenados por posición correctamente", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: aMiPlantilla({
        jugadores: [
          { id: 1, name: "Jugador 1", position: "Delantero" },
          { id: 2, name: "Jugador 2", position: "Portero" },
          { id: 3, name: "Jugador 3", position: "Defensa" },
        ],
      }),
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiPlantilla />);
    const items = screen.getAllByRole("listitem");

    expect(items[0]).toHaveTextContent("Jugador 2");
    expect(items[1]).toHaveTextContent("Jugador 3");
    expect(items[2]).toHaveTextContent("Jugador 1");
  });

  it("abre el modal para vender un jugador al hacer clic en el botón 'Vender'", async () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: aMiPlantilla(),
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiPlantilla />);

    const venderButtons = screen.getAllByRole("button", { name: /vender/i });
    await venderButtons[0].click();

    expect(screen.getByText("Confirmar venta")).toBeInTheDocument();
  });
});
