import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithRouter } from "@test-utils/renderWithRouter";
import { Home } from "../Home";
import * as useAuth from "@core/auth/useAuth";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("en el componente Home", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.restoreAllMocks();
  });
  it("muestra la página de inicio por defecto", () => {
    renderWithRouter(<Home />);

    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
  });

  it("navega a la página de crear usuario al hacer click", async () => {
    renderWithRouter(<Home />);

    await userEvent.click(screen.getByText("Crear usuario"));

    expect(mockNavigate).toHaveBeenCalledWith("/formulario-entrada");
  });

  it("navega a la página de iniciar sesión al hacer click", async () => {
    renderWithRouter(<Home />);

    await userEvent.click(screen.getByText("Iniciar sesión"));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("muestra el botón de cerrar sesión si el usuario está autenticado", () => {
    // Mock del hook useAuth para simular un usuario autenticado
    const useAuthMock = vi.spyOn(useAuth, "useAuth");
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      user: { id: 1, username: "demo" },
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderWithRouter(<Home />);

    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });
});
