import { renderWithRouter } from "@test-utils/renderWithRouter";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Clasificacion } from "../Clasificacion";

describe("en el componente Clasificacion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("debería renderizarlo correctamente", () => {
    renderWithRouter(<Clasificacion />);

    expect(
      screen.getByText(/Clasificación de la liga de fútbol/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Usuario1")).toBeInTheDocument();
    expect(screen.getByText("Usuario2")).toBeInTheDocument();
  });

  it("debería mostrar un mensaje de carga mientras se obtienen los datos", () => {
    vi.spyOn(usuariosService, "useUsuariosByLigaId").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as any);
    renderWithRouter(<Clasificacion />);

    expect(
      screen.getByText("Cargando clasificacion de la liga..."),
    ).toBeInTheDocument();
  });

  it("debería mostrar un mensaje de carga mientras se obtienen los datos", () => {
    vi.spyOn(usuariosService, "useUsuariosByLigaId").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any);
    renderWithRouter(<Clasificacion />);

    expect(
      screen.getByText("Error al cargar la clasificacion de la liga..."),
    ).toBeInTheDocument();
  });

  it("debería mostrar a los usuarios ordenados por puntos", () => {
    const mockUsuarios = [
      { id: 1, name: "Usuario1", puntos: 50 },
      { id: 2, name: "Usuario2", puntos: 70 },
    ];
    vi.spyOn(usuariosService, "useUsuariosByLigaId").mockReturnValue({
      data: mockUsuarios,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<Clasificacion />);

    const usuario1 = screen.getByText("Usuario1");
    const usuario2 = screen.getByText("Usuario2");
    const lista = usuario1.closest("ul") || usuario2.closest("ul");
    const items = lista?.querySelectorAll("li");

    expect(items?.[0]).toContainElement(usuario2);
    expect(items?.[1]).toContainElement(usuario1);
  });
});
