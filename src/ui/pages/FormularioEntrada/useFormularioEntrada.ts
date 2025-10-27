import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { step1Schema, Step1Data } from "./schemas/step1.schema";
import { step2Schema, Step2Data } from "./schemas/step2.schema";
import { useAuth } from "@core/auth/useAuth";

export function useFormularioEntrada() {
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

  return {
    step,
    showPassword,
    showConfirmPassword,
    step1Form,
    step2Form,
    handleNext,
    handleBack,
    handleFinalSubmit,
    setShowPassword,
    setShowConfirmPassword,
  };
}
