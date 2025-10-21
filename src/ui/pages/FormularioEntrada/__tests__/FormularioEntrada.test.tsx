import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormularioEntrada } from "../FormularioEntrada";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderWithRouter } from "@test-utils/renderWithRouter";

// Mock global para useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("en el FormularioEntrada", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.restoreAllMocks();
  });

  it("renderiza todos los campos y el botón en el paso 1", () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    // Act: nada que hacer, solo render
    // Assert
    expect(screen.getByLabelText("Nombre:")).toBeInTheDocument();
    expect(screen.getByLabelText("Teléfono (opcional):")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña:")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Confirmación de Contraseña:"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /siguiente/i }),
    ).toBeInTheDocument();
  });

  it("muestra error si el nombre está vacío", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    // Act
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    // Assert
    expect(
      await screen.findByText(/nombre es obligatorio/i),
    ).toBeInTheDocument();
  });

  it("muestra error si el email no es válido", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    // Act
    await userEvent.type(screen.getByLabelText("Email:"), "correo-invalido");
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    // Assert
    expect(await screen.findByText(/email no válido/i)).toBeInTheDocument();
  });

  it("muestra error si la contraseña es menor de 6 caracteres", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    // Act
    await userEvent.type(screen.getByLabelText("Contraseña:"), "123");
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    // Assert
    expect(
      await screen.findByText(/contraseña debe tener al menos 6 caracteres/i),
    ).toBeInTheDocument();
  });

  it("muestra error si las contraseñas no coinciden", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    // Act
    await userEvent.type(screen.getByLabelText("Contraseña:"), "abcdef");
    await userEvent.type(
      screen.getByLabelText("Confirmación de Contraseña:"),
      "123456",
    );
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    // Assert
    expect(
      await screen.findByText(/contraseñas no coinciden/i),
    ).toBeInTheDocument();
  });

  it("avanza al paso 2 si los datos del paso 1 son válidos", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    // Act
    await userEvent.type(screen.getByLabelText("Nombre:"), "Juan");
    await userEvent.type(screen.getByLabelText("Email:"), "juan@mail.com");
    await userEvent.type(screen.getByLabelText("Contraseña:"), "abcdef");
    await userEvent.type(
      screen.getByLabelText("Confirmación de Contraseña:"),
      "abcdef",
    );
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    // Assert
    expect(screen.getByLabelText("Nombre del Equipo:")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre de Usuario:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("muestra error si el nombre de equipo está vacío en el paso 2", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    await userEvent.type(screen.getByLabelText("Nombre:"), "Juan");
    await userEvent.type(screen.getByLabelText("Email:"), "juan@mail.com");
    await userEvent.type(screen.getByLabelText("Contraseña:"), "abcdef");
    await userEvent.type(
      screen.getByLabelText("Confirmación de Contraseña:"),
      "abcdef",
    );
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    // Act
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    // Assert
    expect(
      await screen.findByText(/nombre del equipo es obligatorio/i),
    ).toBeInTheDocument();
  });

  it("muestra error si el nombre de usuario está vacío en el paso 2", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    await userEvent.type(screen.getByLabelText("Nombre:"), "Juan");
    await userEvent.type(screen.getByLabelText("Email:"), "juan@mail.com");
    await userEvent.type(screen.getByLabelText("Contraseña:"), "abcdef");
    await userEvent.type(
      screen.getByLabelText("Confirmación de Contraseña:"),
      "abcdef",
    );
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    // Act
    await userEvent.type(
      screen.getByLabelText("Nombre del Equipo:"),
      "Equipo1",
    );
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    // Assert
    expect(
      await screen.findByText(/nombre de usuario es obligatorio/i),
    ).toBeInTheDocument();
  });

  it("envía el formulario y navega si todos los datos son válidos", async () => {
    // Arrange
    renderWithRouter(<FormularioEntrada />);
    await userEvent.type(screen.getByLabelText("Nombre:"), "Juan");
    await userEvent.type(screen.getByLabelText("Email:"), "juan@mail.com");
    await userEvent.type(screen.getByLabelText("Contraseña:"), "abcdef");
    await userEvent.type(
      screen.getByLabelText("Confirmación de Contraseña:"),
      "abcdef",
    );
    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }));
    await userEvent.type(
      screen.getByLabelText("Nombre del Equipo:"),
      "Equipo1",
    );
    await userEvent.type(
      screen.getByLabelText("Nombre de Usuario:"),
      "usuario1",
    );
    // Act
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    // Assert
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
