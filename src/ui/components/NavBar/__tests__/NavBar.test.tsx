import { renderWithRouter } from "@test-utils/renderWithRouter";
import { NavBar } from "../NavBar";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { beforeEach, expect, vi, describe, it } from "vitest";
import * as useAuth from "@core/auth/useAuth";

// Mock global para useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("en el componente NavBar", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.restoreAllMocks();
  });

  it("debería ir a la pagina de jugadores al hacer click en el botón 'Jugadores'", async () => {
    // Arrange
    renderWithRouter(<NavBar />);
    // Act
    const jugadoresButton = screen.getByRole("button", { name: /jugadores/i });
    await userEvent.click(jugadoresButton);
    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("/players");
  });

  it("debería ir a la pagina de inicio al hacer click en el botón 'Pagina de Inicio'", async () => {
    // Arrange
    renderWithRouter(<NavBar />);
    // Act
    const jugadoresButton = screen.getByRole("button", {
      name: /Jugadores/i,
    });
    await userEvent.click(jugadoresButton);
    const inicioButton = screen.getByRole("button", {
      name: /pagina de inicio/i,
    });
    await userEvent.click(inicioButton);
    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("debería mostrar el botón 'Crear Tu Liga' si el usuario está autenticado", () => {
    // Arrange
    const useAuthMock = vi.spyOn(useAuth, "useAuth");
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });
    renderWithRouter(<NavBar />);
    // Act
    const crearTuLigaButton = screen.getByRole("button", {
      name: /crear tu liga/i,
    });
    // Assert
    expect(crearTuLigaButton).toBeInTheDocument();
  });
  it("no debería mostrar el botón 'Crear Tu Liga' si el usuario no está autenticado", () => {
    // Arrange
    const useAuthMock = vi.spyOn(useAuth, "useAuth");
    useAuthMock.mockReturnValue({
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
    renderWithRouter(<NavBar />);
    // Act
    const crearTuLigaButton = screen.queryByRole("button", {
      name: /crear tu liga/i,
    });
    // Assert
    expect(crearTuLigaButton).not.toBeInTheDocument();
  });

  it("debería ir a la pagina de 'Crear Tu Liga' al hacer click en el botón correspondiente", async () => {
    // Arrange
    const useAuthMock = vi.spyOn(useAuth, "useAuth");
    useAuthMock.mockReturnValue({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });
    renderWithRouter(<NavBar />);
    // Act
    const crearTuLigaButton = screen.getByRole("button", {
      name: /crear tu liga/i,
    });
    await userEvent.click(crearTuLigaButton);
    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("/crear-tu-liga");
  });
});
