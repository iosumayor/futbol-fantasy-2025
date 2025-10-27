import styles from "./Login.module.scss";
import { Title } from "@ui/components/Common/Title/Title";
import { Button } from "@ui/components/Common/Button/Button";
import { Field } from "@ui/components/Common/Field/Field";
import { useLogin } from "./useLogin";

export const Login: React.FC = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useLogin();

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
