import { renderWithRouter } from "@test-utils/renderWithRouter";
import { screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MiPlantilla } from "../MiPlantilla";
import * as miPlantillaService from "@core/services/miPlantillaService";
import * as usuariosService from "@core/services/usuariosByLigaService";
import { aMiPlantilla } from "@core/domain/___mocks___/aMiPlantilla";
import { aUsuariosByLiga } from "@core/domain/___mocks___/aUsuariosByLiga";

const mockMiPlantilla = aMiPlantilla({
  jugadores: [
    { id: 1, name: "Jugador 1", position: "Portero" },
    { id: 2, name: "Jugador 2", position: "Defensa" },
    { id: 3, name: "Jugador 3", position: "Centrocampista" },
  ],
});

const mockUsuarios = [
  aUsuariosByLiga({ id: 1, username: "Usuario1", points: 50, ligaId: 1 }),
  aUsuariosByLiga({ id: 2, username: "Usuario2", points: 100, ligaId: 1 }),
  aUsuariosByLiga({ id: 3, username: "Usuario2", points: 80, ligaId: 2 }),
];

function setupServicesMocks({
  miPlantilla = mockMiPlantilla,
  usuarios = mockUsuarios,
  usuariosLoading = false,
  usuariosError = false,
  miPlantillaLoading = false,
  miPlantillaError = false,
  ligaId = 1,
} = {}) {
  vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
    data: miPlantilla,
    isLoading: miPlantillaLoading,
    isError: miPlantillaError,
  } as any);
  vi.spyOn(usuariosService, "useUsuariosByLigaId").mockReturnValue({
    data: usuarios.filter((u) => u.ligaId === ligaId),
    isLoading: usuariosLoading,
    isError: usuariosError,
  } as any);
  renderWithRouter(<MiPlantilla />);
}

describe("en el la pagina de mi plantilla", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra correctamente los jugadores en la plantilla", () => {
    setupServicesMocks();

    expect(screen.getByText("Mi Plantilla de Usuario1")).toBeInTheDocument();
    expect(screen.getByText("Jugador 1")).toBeInTheDocument();
    expect(screen.getByText("Jugador 2")).toBeInTheDocument();
  });

  it("muestra el estado de carga, (isLoading)", () => {
    setupServicesMocks({ miPlantillaLoading: true });

    expect(screen.getByText("Cargando mi plantilla...")).toBeInTheDocument();
  });

  it("muestra el estado de error, (isError)", () => {
    setupServicesMocks({ miPlantillaError: true });

    expect(
      screen.getByText("Error al cargar mi plantilla"),
    ).toBeInTheDocument();
  });

  it("los jugadores están ordenados por posición correctamente", () => {
    setupServicesMocks();

    // Busca todas las filas del tbody
    const rows = screen.getAllByRole("row").slice(1); // omite la cabecera

    // Comprobamos el orden por posición y nombre
    // el within nos ayuda a buscar dentro de un elemento específico
    expect(within(rows[0]).getByText("Portero")).toBeInTheDocument();
    expect(within(rows[0]).getByText("Jugador 1")).toBeInTheDocument();

    expect(within(rows[1]).getByText("Defensa")).toBeInTheDocument();
    expect(within(rows[1]).getByText("Jugador 2")).toBeInTheDocument();

    expect(within(rows[2]).getByText("Centrocampista")).toBeInTheDocument();
    expect(within(rows[2]).getByText("Jugador 3")).toBeInTheDocument();
  });

  it("abre el modal para vender un jugador al hacer clic en el botón 'Vender'", async () => {
    setupServicesMocks();

    const venderButtons = screen.getAllByRole("button", { name: /vender/i });
    await venderButtons[0].click();

    expect(screen.getByText("Confirmar venta")).toBeInTheDocument();
  });
});
