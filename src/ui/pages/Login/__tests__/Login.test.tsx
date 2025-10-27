import { renderWithRouter } from "@test-utils/renderWithRouter";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Login } from "../Login";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("en la página de Login", () => {
  it("debería renderizar el formulario de login correctamente", () => {
    renderWithRouter(<Login />);

    expect(screen.getByLabelText("Usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i }),
    ).toBeInTheDocument();
  });

  it("debería mostrar errores de validación al enviar el formulario vacío", async () => {
    renderWithRouter(<Login />);

    await userEvent.click(
      screen.getByRole("button", { name: /iniciar sesión/i }),
    );

    expect(
      screen.getByText("El usuario debe tener al menos 6 caracteres"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La contraseña debe tener al menos 6 caracteres"),
    ).toBeInTheDocument();
  });

  it("debería mostrar error al ingresar credenciales incorrectas", async () => {
    renderWithRouter(<Login />);

    await userEvent.type(screen.getByLabelText("Usuario"), "wronguser");
    await userEvent.type(screen.getByLabelText("Contraseña"), "wrongpass");
    await userEvent.click(
      screen.getByRole("button", { name: /iniciar sesión/i }),
    );

    expect(
      await screen.findByText("Usuario o contraseña incorrectos"),
    ).toBeInTheDocument();
  });

  it("debería redirigir a la página de inicio al ingresar credenciales correctas", async () => {
    renderWithRouter(<Login />);

    await userEvent.type(screen.getByLabelText("Usuario"), "testuser");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.click(
      screen.getByRole("button", { name: /iniciar sesión/i }),
    );
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
