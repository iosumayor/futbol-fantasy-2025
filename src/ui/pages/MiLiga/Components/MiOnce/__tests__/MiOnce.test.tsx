import { renderWithRouter } from "@test-utils/renderWithRouter";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MiOnce } from "../MiOnce";
import { screen, within } from "@testing-library/react";
import * as miPlantillaService from "@core/services/miPlantillaService";
import userEvent from "@testing-library/user-event";

describe("en la pagina MiOnce", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deberia renderizar correctamente", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    expect(screen.getByText("Pagina de Mi Once")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Elige tu formacion/i }),
    ).toBeInTheDocument();
  });

  it("muestra el estado de carga, (isLoading)", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    expect(screen.getByText("Cargando la plantilla...")).toBeInTheDocument();
  });

  it("muestra el estado de error, (isError)", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any);
    renderWithRouter(<MiOnce />);

    expect(
      screen.getByText("Error al cargar la plantilla."),
    ).toBeInTheDocument();
  });

  it("te muestra la formacion 4-4-2 de forma correcta", () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    expect(screen.getByRole("combobox")).toHaveValue("4-4-2");
    expect(screen.getAllByRole("button", { name: "+" })).toHaveLength(11);
    [
      "portero",
      "defensa1",
      "defensa2",
      "defensa3",
      "defensa4",
      "medio1",
      "medio2",
      "medio3",
      "medio4",
      "delantero1",
      "delantero2",
    ].forEach((key) => {
      expect(screen.getByTestId(key)).toBeInTheDocument();
    });
  });

  it("te muestra la formacion 4-3-3 de forma correcta", async () => {
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    const changeSelect = screen.getByRole("combobox");
    await userEvent.selectOptions(changeSelect, "4-3-3");

    expect(screen.getByRole("combobox")).toHaveValue("4-3-3");
    expect(screen.getAllByRole("button", { name: "+" })).toHaveLength(11);
    [
      "portero",
      "defensa1",
      "defensa2",
      "defensa3",
      "defensa4",
      "medio1",
      "medio2",
      "medio3",
      "delantero1",
      "delantero2",
      "delantero3",
    ].forEach((key) => {
      expect(screen.getByTestId(key)).toBeInTheDocument();
    });
  });

  it("te muestra los jugadores disponibles al seleccionar una posicion", async () => {
    const mockMiPlantilla = {
      jugadores: [
        { id: 1, name: "Jugador Portero", position: "Portero" },
        { id: 2, name: "Jugador Defensa", position: "Defensa" },
        { id: 3, name: "Jugador Centrocampista", position: "Centrocampista" },
        { id: 4, name: "Jugador Delantero", position: "Delantero" },
      ],
    };
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: mockMiPlantilla,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    const defensaButton = screen
      .getByTestId("defensa1")
      .querySelector("button");
    await userEvent.click(defensaButton!);
    expect(screen.getByText("Elige jugador para Defensa")).toBeInTheDocument();
    expect(screen.getByText("Jugador Defensa")).toBeInTheDocument();
    expect(screen.queryByText("Jugador Portero")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Jugador Centrocampista"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Jugador Delantero")).not.toBeInTheDocument();
  });

  it("te permite asignar un jugador a una posicion y lo muestra como seleccionado", async () => {
    const mockMiPlantilla = {
      jugadores: [
        {
          id: 1,
          name: "Jugador Portero",
          position: "Portero",
          image: "imagenPortero",
        },
        { id: 2, name: "Jugador Defensa", position: "Defensa" },
      ],
    };
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: mockMiPlantilla,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    const porteroButton = screen.getByTestId("portero").querySelector("button");
    await userEvent.click(porteroButton!);
    const jugadorPorteroOption = screen.getByText("Seleccionar");
    await userEvent.click(jugadorPorteroOption);

    expect(screen.getByTestId("portero")).toHaveTextContent("Jugador Portero");
  });

  it("no muestra jugadores ya asignados en otras posiciones", async () => {
    const mockMiPlantilla = {
      jugadores: [
        { id: 1, name: "Jugador Defensa 1", position: "Defensa" },
        { id: 2, name: "Jugador Defensa 2", position: "Defensa" },
      ],
    };
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: mockMiPlantilla,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    const defensa1Button = screen
      .getByTestId("defensa1")
      .querySelector("button");
    await userEvent.click(defensa1Button!);
    const jugadorDefensa1Option = screen.getAllByText("Seleccionar")[0];
    await userEvent.click(jugadorDefensa1Option);
    expect(screen.getByTestId("defensa1")).toHaveTextContent(
      "Jugador Defensa 1",
    );

    const defensa2Button = screen
      .getByTestId("defensa2")
      .querySelector("button");
    await userEvent.click(defensa2Button!);

    const selectorListado = screen.getByRole("list");
    expect(
      within(selectorListado).queryByText("Jugador Defensa 1"),
    ).not.toBeInTheDocument();
    expect(
      within(selectorListado).getByText("Jugador Defensa 2"),
    ).toBeInTheDocument();
  });

  it("si hay asignados jugadores y cambias la formacion, los jugadores asignados se mantienen en sus posiciones", async () => {
    const mockMiPlantilla = {
      jugadores: [
        { id: 1, name: "Jugador Delantero 1", position: "Delantero" },
        { id: 2, name: "Jugador Delantero 2", position: "Delantero" },
        { id: 3, name: "Jugador Delantero 3", position: "Delantero" },
      ],
    };
    vi.spyOn(miPlantillaService, "useMiPlantilla").mockReturnValue({
      data: mockMiPlantilla,
      isLoading: false,
      isError: false,
    } as any);
    renderWithRouter(<MiOnce />);

    const changeSelect = screen.getByRole("combobox");
    await userEvent.selectOptions(changeSelect, "4-3-3");

    const delantero1Button = screen
      .getByTestId("delantero1")
      .querySelector("button");
    await userEvent.click(delantero1Button!);
    const jugadorDelantero1Option = screen.getAllByText("Seleccionar")[0];
    await userEvent.click(jugadorDelantero1Option);

    const delantero2Button = screen
      .getByTestId("delantero2")
      .querySelector("button");
    await userEvent.click(delantero2Button!);
    const jugadorDelantero2Option = screen.getAllByText("Seleccionar")[0];
    await userEvent.click(jugadorDelantero2Option);

    const delantero3Button = screen
      .getByTestId("delantero3")
      .querySelector("button");
    await userEvent.click(delantero3Button!);
    const jugadorDelantero3Option = screen.getAllByText("Seleccionar")[0];
    await userEvent.click(jugadorDelantero3Option);

    const changeSelect2 = screen.getByRole("combobox");
    await userEvent.selectOptions(changeSelect2, "4-4-2");

    expect(screen.getByTestId("delantero1")).toHaveTextContent(
      "Jugador Delantero 1",
    );
    expect(screen.getByTestId("delantero2")).toHaveTextContent(
      "Jugador Delantero 2",
    );
    expect(screen.queryByTestId("delantero3")).not.toBeInTheDocument();
  });
});
