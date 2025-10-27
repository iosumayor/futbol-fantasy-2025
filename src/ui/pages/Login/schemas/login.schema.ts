import z from "zod";

export const loginSchema = z.object({
  usuario: z.string().min(6, "El usuario debe tener al menos 6 caracteres"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const MOCK_USER = {
  usuario: "testuser",
  contraseña: "password123",
};

export type LoginFormData = z.infer<typeof loginSchema>;
