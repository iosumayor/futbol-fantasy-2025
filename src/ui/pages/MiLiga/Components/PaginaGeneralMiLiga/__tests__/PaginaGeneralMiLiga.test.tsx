import { renderWithRouter } from "@test-utils/renderWithRouter";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { PaginaGeneralMiLiga } from "../PaginaGeneralMiLiga";
import * as ligasService from "@core/services/ligasService";
import * as resultadosJornadaService from "@core/services/resultadosJornadaService";
import { aLiga } from "@core/domain/___mocks___/aLigas";
import { aResultadosJornada } from "@core/domain/___mocks___/aResultadosJornada";

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

const mockResultadosJornada = [
  aResultadosJornada({
    jornada: 1,
    partidos: [
      {
        id: 1,
        local: {
          id: 1,
          name: "Equipo A",
          camisetaEquipo: "/assets/equipoA.png",
        },
        visitante: {
          id: 2,
          name: "Equipo B",
          camisetaEquipo: "/assets/equipoB.png",
        },
        golesLocal: 2,
        golesVisitante: 1,
      },
    ],
  }),
  aResultadosJornada({
    jornada: 2,
    partidos: [
      {
        id: 2,
        local: {
          id: 3,
          name: "Equipo C",
          camisetaEquipo: "/assets/equipoC.png",
        },
        visitante: {
          id: 4,
          name: "Equipo D",
          camisetaEquipo: "/assets/equipoD.png",
        },
        golesLocal: 0,
        golesVisitante: 3,
      },
    ],
  }),
];

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

  vi.spyOn(resultadosJornadaService, "useResultadosJornada").mockImplementation(
    (jornadaActual: number) =>
      ({
        data: mockResultadosJornada.find((j) => j.jornada === jornadaActual),
        isLoading: false,
        isError: false,
      }) as any,
  );

  renderWithRouter(<PaginaGeneralMiLiga />);
}

describe("en la pagina general de mi liga", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deberia mostrar un loader mientras se cargan los datos", async () => {
    setupPaginaGeneralMiLigaTest(undefined, true, false);

    expect(
      await screen.findByText("Cargando resultados..."),
    ).toBeInTheDocument();
  });

  it("deberia mostrar un mensaje de error si hay un error al cargar los datos", async () => {
    setupPaginaGeneralMiLigaTest(undefined, false, true);

    expect(
      await screen.findByText("Error al cargar los resultados"),
    ).toBeInTheDocument();
  });

  it("deberia mostrarte los resultados de la jornada en la que te encuentras", async () => {
    setupPaginaGeneralMiLigaTest();

    expect(
      await screen.findByText(/Resultados de la Jornada\s*1/),
    ).toBeInTheDocument();
    expect(screen.getByText("Equipo A")).toBeInTheDocument();
    expect(screen.getByText("Equipo B")).toBeInTheDocument();
    expect(screen.getByText(/2\s*-\s*1/)).toBeInTheDocument();
  });

  it("deberia permitirte navegar entre jornadas", async () => {
    setupPaginaGeneralMiLigaTest();

    const botonJornada2 = await screen.findByRole("button", {
      name: "Jornada 2",
    });
    botonJornada2.click();
    expect(
      await screen.findByText(/Resultados de la Jornada\s*2/),
    ).toBeInTheDocument();
    expect(screen.getByText("Equipo C")).toBeInTheDocument();
    expect(screen.getByText("Equipo D")).toBeInTheDocument();
    expect(screen.getByText(/0\s*-\s*3/)).toBeInTheDocument();
  });
});
