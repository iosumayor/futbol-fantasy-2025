import * as z from "zod";

export const step1Schema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    telefono: z.string().optional(),
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .email("Email no válido"),
    contraseña: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmacionContraseña: z.string(),
  })
  .refine((data) => data.contraseña === data.confirmacionContraseña, {
    message: "Las contraseñas no coinciden",
    path: ["confirmacionContraseña"],
  });

export type Step1Data = z.infer<typeof step1Schema>;
