import { ReactElement } from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";

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
      {ui}
    </MemoryRouter>,
    renderOptions,
  );
}
