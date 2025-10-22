import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./FormularioEntrada.module.scss";
import { useNavigate } from "react-router-dom";
import { step1Schema, Step1Data } from "./step1.schema";
import { step2Schema, Step2Data } from "./step2.schema";
import { useAuth } from "@core/auth/useAuth";
import { Title } from "@ui/components/Common/Title/Title";

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
          <div className={styles.field}>
            <label htmlFor="nombre">Nombre:</label>
            <input id="nombre" {...step1Form.register("nombre")} />
            {step1Form.formState.errors.nombre && (
              <span className={styles.error}>
                {step1Form.formState.errors.nombre.message}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="telefono">Teléfono (opcional):</label>
            <input id="telefono" {...step1Form.register("telefono")} />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" {...step1Form.register("email")} />
            {step1Form.formState.errors.email && (
              <span className={styles.error}>
                {step1Form.formState.errors.email.message}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="contraseña">Contraseña:</label>
            <div className={styles.inputWithIcon}>
              <input
                id="contraseña"
                type={showPassword ? "text" : "password"}
                {...step1Form.register("contraseña")}
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Ver contraseña"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {step1Form.formState.errors.contraseña && (
              <span className={styles.error}>
                {step1Form.formState.errors.contraseña.message}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmacionContraseña">
              Confirmación de Contraseña:
            </label>
            <div className={styles.inputWithIcon}>
              <input
                id="confirmacionContraseña"
                type={showConfirmPassword ? "text" : "password"}
                {...step1Form.register("confirmacionContraseña")}
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword ? "Ocultar contraseña" : "Ver contraseña"
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {step1Form.formState.errors.confirmacionContraseña && (
              <span className={styles.error}>
                {step1Form.formState.errors.confirmacionContraseña.message}
              </span>
            )}
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.nextButton}
              onClick={handleNext}
              disabled={step1Form.formState.isSubmitting}
            >
              Siguiente
            </button>
          </div>
        </form>
      )}
      {step === 1 && (
        <form
          className={styles.form}
          onSubmit={step2Form.handleSubmit(handleFinalSubmit)}
          noValidate
        >
          <div className={styles.field}>
            <label htmlFor="nombreEquipo">Nombre del Equipo:</label>
            <input id="nombreEquipo" {...step2Form.register("nombreEquipo")} />
            {step2Form.formState.errors.nombreEquipo && (
              <span className={styles.error}>
                {step2Form.formState.errors.nombreEquipo.message}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
            <input
              id="nombreUsuario"
              {...step2Form.register("nombreUsuario")}
            />
            {step2Form.formState.errors.nombreUsuario && (
              <span className={styles.error}>
                {step2Form.formState.errors.nombreUsuario.message}
              </span>
            )}
          </div>
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
              disabled={step2Form.formState.isSubmitting}
            >
              Atrás
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={step2Form.formState.isSubmitting}
            >
              {step2Form.formState.isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
