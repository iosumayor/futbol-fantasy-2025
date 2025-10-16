import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormularioEntrada } from "../FormularioEntrada";
import { describe, expect, it, vi } from "vitest";

describe("FormularioEntrada", () => {
  it("renderiza todos los campos y el botón", () => {
    render(<FormularioEntrada />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tel[eé]fono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("muestra error si el nombre está vacío", async () => {
    render(<FormularioEntrada />);
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    expect(
      await screen.findByText(/nombre es obligatorio/i),
    ).toBeInTheDocument();
  });

  it("muestra error si el correo no es válido", async () => {
    render(<FormularioEntrada />);
    await userEvent.type(screen.getByLabelText(/correo/i), "correo-invalido");
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    expect(await screen.findByText(/correo no válido/i)).toBeInTheDocument();
  });

  it("envía el formulario si todos los datos son válidos", async () => {
    const handleSubmit = vi.fn();
    render(<FormularioEntrada onSubmit={handleSubmit} />);
    await userEvent.type(screen.getByLabelText(/nombre/i), "Juan");
    await userEvent.type(screen.getByLabelText(/correo/i), "juan@mail.com");
    await userEvent.type(screen.getByLabelText(/tel[eé]fono/i), "600123456");
    await userEvent.type(screen.getByLabelText(/email/i), "juan@mail.com");
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
