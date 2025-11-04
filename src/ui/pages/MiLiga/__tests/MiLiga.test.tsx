import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import * as ligasService from "@core/services/ligasService";
import { renderWithRouter } from "@test-utils/renderWithRouter";
import { MiLiga } from "../MiLiga";
import { aLiga } from "@core/domain/___mocks___/aLigas";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockLigas = [
  aLiga({ name: "Liga de Prueba", id: 1 }),
  aLiga({ name: "Liga de Prueba 2", id: 2 }),
];

function setupMiLigaTest(data = mockLigas, isLoading = false, isError = false) {
  vi.spyOn(ligasService, "useAllLigas").mockReturnValue({
    data,
    isLoading,
    isError,
  } as any);
  renderWithRouter(<MiLiga />);
}

describe("en la página de MiLiga", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debería mostrar la liga del usuario con sus equipos", async () => {
    setupMiLigaTest();

    expect(await screen.findByText("Liga de Prueba")).toBeInTheDocument();
    expect(screen.getByText("Liga de Prueba 2")).toBeInTheDocument();
  });

  it("deberia mostrar la descripcion si la liga tiene descripcion", async () => {
    const ligaConDescripcion = aLiga({
      name: "Liga con Descripcion",
      description: "Esta es una liga de prueba con descripcion",
    });
    setupMiLigaTest([ligaConDescripcion]);

    expect(
      await screen.getByText(
        "Descripcion: Esta es una liga de prueba con descripcion",
      ),
    ).toBeInTheDocument();
  });

  it("debería mostrar un mensaje de carga mientras se obtienen las ligas", () => {
    setupMiLigaTest(undefined, true, false);

    expect(screen.getByText("Cargando ligas...")).toBeInTheDocument();
  });

  it("debería mostrar un mensaje de error si falla la carga de ligas", () => {
    setupMiLigaTest(undefined, false, true);

    expect(screen.getByText("Error al cargar ligas")).toBeInTheDocument();
  });

  it("debería navegar a la página de cada liga al hacer click en su nombre", async () => {
    setupMiLigaTest();

    const ligaElement = await screen.findByText("Liga de Prueba");
    ligaElement.click();

    expect(mockNavigate).toHaveBeenCalledWith("/mi-liga/1");
  });
});
