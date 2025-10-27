import { useAuth } from "@core/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { loginSchema, LoginFormData, MOCK_USER } from "./schemas/login.schema";
import { Title } from "@ui/components/Common/Title/Title";
import { Button } from "@ui/components/Common/Button/Button";
import { Field } from "@ui/components/Common/Field/Field";

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
    defaultValues: {
      usuario: "",
      contraseña: "",
    },
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
        <Field
          label="Usuario"
          type="text"
          error={errors.usuario?.message}
          {...register("usuario")}
        />
        <Field
          label="Contraseña"
          type="password"
          error={errors.contraseña?.message}
          {...register("contraseña")}
        />
        <Button variant="blue" type="submit" disabled={isSubmitting}>
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};
