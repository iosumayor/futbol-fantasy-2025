import { renderWithRouter } from "@test-utils/renderWithRouter";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MiLigaLayout } from "../MiLigaLayout";
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
  renderWithRouter(<MiLigaLayout />, { route: "/mi-liga/1" });
}

describe("en la pagina general de mi liga", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("deberia navegar a la pagina de mercado al hacer click en el boton mercado", async () => {
    setupPaginaGeneralMiLigaTest();

    const botonMercado = await screen.findByRole("button", { name: "Mercado" });
    botonMercado.click();

    expect(mockNavigate).toHaveBeenCalledWith("/mi-liga/1/mercado");
  });

  it("deberia navegar a la pagina de clasificacion al hacer click en el boton clasificacion", () => {
    setupPaginaGeneralMiLigaTest();
    const botonClasificacion = screen.getByText("Clasificación");
    botonClasificacion.click();
    expect(mockNavigate).toHaveBeenCalledWith("/mi-liga/1/clasificacion");
  });

  it("deberia navegar a la pagina de plantilla al hacer click en el boton plantilla", () => {
    setupPaginaGeneralMiLigaTest();
    const botonPlantilla = screen.getByText("Mi Plantilla");
    botonPlantilla.click();
    expect(mockNavigate).toHaveBeenCalledWith("/mi-liga/1/plantilla");
  });

  it("deberia navegar a la pagina de once titular al hacer click en el boton once titular", () => {
    setupPaginaGeneralMiLigaTest();
    const botonOnce = screen.getByText("Once Titular");
    botonOnce.click();
    expect(mockNavigate).toHaveBeenCalledWith("/mi-liga/1/once");
  });

  it("deberia navegar a la pagina de inicio al hacer click en el boton inicio", () => {
    setupPaginaGeneralMiLigaTest();
    const botonInicio = screen.getByText("Inicio");
    botonInicio.click();
    expect(mockNavigate).toHaveBeenCalledWith("/mi-liga/1");
  });
});
