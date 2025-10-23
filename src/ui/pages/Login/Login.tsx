import { useAuth } from "@core/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import styles from "./Login.module.scss";
import { Title } from "@ui/components/Common/Title/Title";
import { Button } from "@ui/components/Common/Button/Button";

const loginSchema = z.object({
  usuario: z.string().min(6, "El usuario debe tener al menos 6 caracteres"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

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
    <div className={styles.loginContainer}>
      <Title level={1} align="center">
        Iniciar sesión
      </Title>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.field}>
          <label htmlFor="usuario">Usuario</label>
          <input type="text" id="usuario" {...register("usuario")} />
          {errors.usuario && <span>{errors.usuario.message}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contraseña">Contraseña</label>
          <input type="password" id="contraseña" {...register("contraseña")} />
          {errors.contraseña && <span>{errors.contraseña.message}</span>}
        </div>
        <Button variant="blue" type="submit" disabled={isSubmitting}>
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};
