import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./FormularioEntrada.module.scss";
import { useNavigate } from "react-router-dom";
import { step1Schema, Step1Data } from "./step1.schema";
import { step2Schema, Step2Data } from "./step2.schema";
import { useAuth } from "@core/auth/useAuth";
import { Title } from "@ui/components/Common/Title/Title";
import { Button } from "@ui/components/Common/Button/Button";
import { Field } from "@ui/components/Common/Field/Field";

export const FormularioEntrada: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasTriedNext, setHasTriedNext] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Paso 1
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: hasTriedNext ? "onChange" : "onSubmit",
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      contraseña: "",
      confirmacionContraseña: "",
    },
  });

  // Paso 2
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onBlur",
    defaultValues: {
      nombreEquipo: "",
      nombreUsuario: "",
    },
  });

  // Paso 1: Siguiente
  const handleNext = async () => {
    setHasTriedNext(true);
    const valid = await step1Form.trigger();
    if (valid) setStep(1);
  };

  // Paso 2: Atrás
  const handleBack = () => {
    setStep(0);
    step1Form.clearErrors();
  };

  // Paso 2: Enviar
  const handleFinalSubmit = async (data: Step2Data) => {
    const step1Data = step1Form.getValues();
    const allData = { ...step1Data, ...data };
    console.log("Datos enviados:", allData);
    login();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <Title level={2} align="center">
        Formulario de Entrada
      </Title>
      {step === 0 && (
        <form className={styles.form} noValidate>
          <Field
            label="Nombre:"
            id="nombre"
            error={step1Form.formState.errors.nombre?.message}
            {...step1Form.register("nombre")}
          />
          <Field
            label="Teléfono (opcional):"
            id="telefono"
            {...step1Form.register("telefono")}
          />
          <Field
            label="Email:"
            id="email"
            type="email"
            error={step1Form.formState.errors.email?.message}
            {...step1Form.register("email")}
          />
          <Field
            label="Contraseña:"
            id="contraseña"
            type={showPassword ? "text" : "password"}
            error={step1Form.formState.errors.contraseña?.message}
            isPasswordField
            onTogglePassword={() => setShowPassword((v) => !v)}
            {...step1Form.register("contraseña")}
          />
          <Field
            label="Confirmación de Contraseña:"
            id="confirmacionContraseña"
            type={showConfirmPassword ? "text" : "password"}
            error={step1Form.formState.errors.confirmacionContraseña?.message}
            isPasswordField
            onTogglePassword={() => setShowConfirmPassword((v) => !v)}
            {...step1Form.register("confirmacionContraseña")}
          />
          <div className={styles.actionButtons}>
            <Button
              type="button"
              variant="green"
              onClick={handleNext}
              disabled={step1Form.formState.isSubmitting}
            >
              Siguiente
            </Button>
          </div>
        </form>
      )}
      {step === 1 && (
        <form
          className={styles.form}
          onSubmit={step2Form.handleSubmit(handleFinalSubmit)}
          noValidate
        >
          <Field
            label="Nombre del Equipo:"
            id="nombreEquipo"
            error={step2Form.formState.errors.nombreEquipo?.message}
            {...step2Form.register("nombreEquipo")}
          />
          <Field
            label="Nombre de Usuario:"
            id="nombreUsuario"
            error={step2Form.formState.errors.nombreUsuario?.message}
            {...step2Form.register("nombreUsuario")}
          />
          <div className={styles.actionButtons}>
            <Button
              type="button"
              variant="blue"
              onClick={handleBack}
              disabled={step2Form.formState.isSubmitting}
            >
              Atrás
            </Button>
            <Button
              type="submit"
              variant="green"
              disabled={step2Form.formState.isSubmitting}
            >
              {step2Form.formState.isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
