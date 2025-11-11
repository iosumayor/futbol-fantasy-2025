import { renderWithRouter } from "@test-utils/renderWithRouter";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Clasificacion } from "../Clasificacion";
import * as usuariosService from "@core/services/usuariosByLigaService";
import * as ligaService from "@core/services/ligasService";
import { aLiga } from "@core/domain/___mocks___/aLigas";
import { aUsuariosByLiga } from "@core/domain/___mocks___/aUsuariosByLiga";

const mockUsuarios = [
  aUsuariosByLiga({ id: 1, username: "Usuario1", points: 50, ligaId: 1 }),
  aUsuariosByLiga({ id: 2, username: "Usuario2", points: 100, ligaId: 1 }),
  aUsuariosByLiga({ id: 3, username: "Usuario2", points: 80, ligaId: 2 }),
];

const mockLiga = [
  aLiga({ id: 1, name: "La Liga" }),
  aLiga({ id: 2, name: "Premier League" }),
];

function setupServicesMocks({
  usuarios = mockUsuarios,
  liga = mockLiga,
  usuariosLoading = false,
  usuariosError = false,
  ligaLoading = false,
  ligaError = false,
  ligaId = 1,
} = {}) {
  vi.spyOn(usuariosService, "useUsuariosByLigaId").mockReturnValue({
    data: usuarios.filter((u) => u.ligaId === ligaId),
    isLoading: usuariosLoading,
    isError: usuariosError,
  } as any);
  vi.spyOn(ligaService, "useLigaById").mockReturnValue({
    data: liga.find((l) => l.id === ligaId),
    isLoading: ligaLoading,
    isError: ligaError,
  } as any);
  renderWithRouter(<Clasificacion />);
}

describe("en el componente Clasificacion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("debería renderizarlo correctamente", () => {
    setupServicesMocks();

    expect(
      screen.getByText("Clasificacion de la liga de La Liga"),
    ).toBeInTheDocument();
    expect(screen.getByText("Usuario1")).toBeInTheDocument();
    expect(screen.getByText("Usuario2")).toBeInTheDocument();
  });

  it("debería mostrar el estado de carga (isLoading)", () => {
    setupServicesMocks({ usuariosLoading: true });

    expect(
      screen.getByText("Cargando clasificacion de la liga..."),
    ).toBeInTheDocument();
  });

  it("debería mostrar el estado de error (isError)", () => {
    setupServicesMocks({ usuariosError: true });

    expect(
      screen.getByText("Error al cargar la clasificacion de la liga"),
    ).toBeInTheDocument();
  });

  it("debería mostrar a los usuarios ordenados por puntos", () => {
    setupServicesMocks();

    screen.debug();

    const usuario1 = screen.getByText("Usuario1");
    const usuario2 = screen.getByText("Usuario2");
    const lista = usuario1.closest("ul") || usuario2.closest("ul");
    const items = lista?.querySelectorAll("li");

    expect(items?.[0]).toContainElement(usuario2);
    expect(items?.[1]).toContainElement(usuario1);
  });
});
