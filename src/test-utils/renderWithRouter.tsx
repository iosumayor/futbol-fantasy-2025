import { ReactElement } from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { AuthProvider } from "@core/auth/AuthContext";

export function renderWithRouter(
  ui: ReactElement,
  {
    route = "/",
    memoryRouterProps = {},
    ...renderOptions
  }: {
    route?: string;
    memoryRouterProps?: MemoryRouterProps;
  } & RenderOptions = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]} {...memoryRouterProps}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>,
    renderOptions,
  );
}
