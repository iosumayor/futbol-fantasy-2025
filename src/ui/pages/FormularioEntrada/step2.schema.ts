import * as z from "zod";

export const step2Schema = z.object({
  nombreEquipo: z.string().min(2, "El nombre del equipo es obligatorio"),
  nombreUsuario: z.string().min(2, "El nombre de usuario es obligatorio"),
});

export type Step2Data = z.infer<typeof step2Schema>;
