import { renderWithRouter } from "@test-utils/renderWithRouter";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { PaginaGeneralMiLiga } from "../PaginaGeneralMiLiga";
import * as ligasService from "@core/services/ligasService";
import { aLiga } from "@core/domain/___mocks___/aLigas";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
  };
});

const mockLiga = aLiga({ name: "Liga de Prueba", id: 1 });

function setupPaginaGeneralMiLigaTest(
  data = mockLiga,
  isLoading = false,
  isError = false,
) {
  vi.spyOn(ligasService, "useLigaById").mockReturnValue({
    data,
    isLoading,
    isError,
  } as any);
  renderWithRouter(<PaginaGeneralMiLiga />);
}

describe("en la pagina general de mi liga", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deberia mostrar un loader mientras se cargan los datos", async () => {
    setupPaginaGeneralMiLigaTest(undefined, true, false);

    expect(await screen.findByText("Cargando liga...")).toBeInTheDocument();
  });

  it("deberia mostrar un mensaje de error si hay un error al cargar los datos", async () => {
    setupPaginaGeneralMiLigaTest(undefined, false, true);

    expect(
      await screen.findByText("Error al cargar la liga"),
    ).toBeInTheDocument();
  });

  it("deberia mostrarte los resultados de la jornada en la que te encuentras", async () => {
    setupPaginaGeneralMiLigaTest();

    expect(await screen.findByText("Resultados Jornada 1")).toBeInTheDocument();
    expect(screen.getByText("Equipo A")).toBeInTheDocument();
    expect(screen.getByText("Equipo B")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("deberia permitirte navegar entre jornadas", async () => {
    setupPaginaGeneralMiLigaTest();

    const botonJornada2 = await screen.findByRole("button", {
      name: "Jornada 2",
    });
    botonJornada2.click();
    expect(await screen.findByText("Resultados Jornada 2")).toBeInTheDocument();
    expect(screen.getByText("Equipo C")).toBeInTheDocument();
    expect(screen.getByText("Equipo D")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
