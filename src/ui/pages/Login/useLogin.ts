import { useAuth } from "@core/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginFormData, MOCK_USER } from "./schemas/login.schema";

export function useLogin() {
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

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
