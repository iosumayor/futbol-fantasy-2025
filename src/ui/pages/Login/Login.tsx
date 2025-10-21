import { useAuth } from "@core/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const loginSchema = z.object({
  usuario: z.string().min(6, "El usuario debe tener al menos 6 caracteres"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

///TODO: Modificar posteriormente
const MOCK_USER = {
  usuario: "testuser",
  contraseña: "password123",
};

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (
      data.usuario === MOCK_USER.usuario &&
      data.contraseña === MOCK_USER.contraseña
    ) {
      login();
      navigate("/");
    } else {
      setError("contraseña", { message: "Usuario o contraseña incorrectos" });
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="usuario">Usuario</label>
          <input type="text" id="usuario" {...register("usuario")} />
          {errors.usuario && <span>{errors.usuario.message}</span>}
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" id="contraseña" {...register("contraseña")} />
          {errors.contraseña && <span>{errors.contraseña.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};
