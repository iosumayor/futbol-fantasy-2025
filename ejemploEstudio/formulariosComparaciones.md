# Comparativa: Formularios multi-pestaña en React + TypeScript

| Opción            | Validación | Integración TypeScript | Rendimiento | Sencillez | Comunidad | Ejemplo                          |
| ----------------- | ---------- | ---------------------- | ----------- | --------- | --------- | -------------------------------- |
| RHF + Zod         | Zod        | Excelente (type-safe)  | Muy alto    | Alta      | Muy alta  | [Ver abajo](#ejemplo-rhf-zod)    |
| Formik + Yup      | Yup        | Bueno                  | Medio       | Media     | Alta      | [Ver abajo](#ejemplo-formik-yup) |
| useReducer (puro) | Manual     | Depende del código     | Medio       | Baja      | Media     | [Ver abajo](#ejemplo-usereducer) |

---

## Ventajas y desventajas

### RHF + Zod

**Ventajas:**

- Validación declarativa y type-safe.
- Gran rendimiento y menos renders.
- API moderna y fácil de usar.
- Gran comunidad y soporte futuro.

**Desventajas:**

- Menos ejemplos en español que Formik/Yup.
- Zod puede ser nuevo para algunos desarrolladores.

---

### Formik + Yup

**Ventajas:**

- Muy probado y estable.
- Integración directa con Yup para validaciones complejas.
- Fácil de encontrar ejemplos y soporte.

**Desventajas:**

- Menor rendimiento en formularios grandes.
- API menos alineada con hooks modernos.
- Más código para formularios multi-paso.

---

### useReducer (puro)

**Ventajas:**

- Máximo control sobre el estado y la lógica.
- Sin dependencias externas.

**Desventajas:**

- Validaciones manuales y más código "boilerplate".
- Menos helpers para UX/errores.
- Más difícil de mantener en proyectos grandes.

---

## Ejemplo RHF + Zod

```tsx
// Ejemplo de formulario multi-paso usando React Hook Form + Zod.
// Este ejemplo incluye validaciones type-safe y navegación entre pasos.

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Esquema de validación con Zod
const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  correo: z.string().email("Correo inválido"),
  equipo: z.string().min(1, "El nombre del equipo es obligatorio"),
});

// Inferimos el tipo TypeScript directamente del esquema Zod
type FormData = z.infer<typeof schema>;

export default function FormularioRHFZod() {
  const [step, setStep] = useState(0);

  // Configuramos React Hook Form con el resolver de Zod
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // Función para avanzar al siguiente paso con validación
  const nextStep = async () => {
    // Solo valida los campos del paso actual
    const valid = await trigger(step === 0 ? ["nombre", "correo"] : ["equipo"]);
    if (valid) setStep(step + 1);
  };

  // Render del formulario según el paso actual
  return (
    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
      {step === 0 && (
        <>
          <input {...register("nombre")} placeholder="Nombre" />
          <p>{errors.nombre?.message}</p>
          <input {...register("correo")} placeholder="Correo" />
          <p>{errors.correo?.message}</p>
          <button type="button" onClick={nextStep}>
            Siguiente
          </button>
        </>
      )}
      {step === 1 && (
        <>
          <input {...register("equipo")} placeholder="Nombre del equipo" />
          <p>{errors.equipo?.message}</p>
          <button type="submit">Enviar</button>
        </>
      )}
    </form>
  );
}
```

---

## Ejemplo Formik + Yup

```tsx
// Ejemplo de formulario multi-paso usando Formik + Yup.
// Incluye validaciones y navegación entre pasos.

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  correo: Yup.string().email("Correo inválido").required(),
  equipo: Yup.string().required("El equipo es obligatorio"),
});

export default function FormikYupMultiStep() {
  const [step, setStep] = useState(0);

  return (
    <Formik
      initialValues={{ nombre: "", correo: "", equipo: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      {({ validateForm }) => (
        <Form>
          {step === 0 && (
            <>
              <Field name="nombre" placeholder="Nombre" />
              {/* Muestra el error si el campo es inválido */}
              <ErrorMessage name="nombre" component="p" />
              <Field name="correo" placeholder="Correo" />
              <ErrorMessage name="correo" component="p" />
              <button
                type="button"
                onClick={async () => {
                  // Valida los campos del paso actual
                  const errors = await validateForm();
                  if (!errors.nombre && !errors.correo) setStep(1);
                }}
              >
                Siguiente
              </button>
            </>
          )}
          {step === 1 && (
            <>
              <Field name="equipo" placeholder="Nombre del equipo" />
              <ErrorMessage name="equipo" component="p" />
              <button type="submit">Enviar</button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
```

---

## Ejemplo useReducer

```tsx
// Ejemplo de formulario multi-paso usando useReducer puro.
// Aquí la gestión del estado y la validación se hace manualmente.

import React, { useReducer, useState } from "react";

// Estado inicial del formulario
const initialState = { nombre: "", correo: "", equipo: "" };

// Reducer para gestionar los cambios del formulario
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Validación manual según el paso
function validate(state, step) {
  const errors = {};
  if (step === 0) {
    if (!state.nombre) errors.nombre = "El nombre es obligatorio";
    if (!state.correo || !/\S+@\S+\.\S+/.test(state.correo))
      errors.correo = "Correo inválido";
  } else if (step === 1) {
    if (!state.equipo) errors.equipo = "El equipo es obligatorio";
  }
  return errors;
}

export default function UseReducerMultiStep() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  // Avanza al siguiente paso si no hay errores
  const next = () => {
    const errs = validate(state, step);
    if (Object.keys(errs).length === 0) setStep(step + 1);
    else setErrors(errs);
  };

  // Actualiza el estado ante cambios en los inputs
  const handleChange = (e) =>
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(JSON.stringify(state));
      }}
    >
      {step === 0 && (
        <>
          <input
            name="nombre"
            value={state.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <p>{errors.nombre}</p>
          <input
            name="correo"
            value={state.correo}
            onChange={handleChange}
            placeholder="Correo"
          />
          <p>{errors.correo}</p>
          <button type="button" onClick={next}>
            Siguiente
          </button>
        </>
      )}
      {step === 1 && (
        <>
          <input
            name="equipo"
            value={state.equipo}
            onChange={handleChange}
            placeholder="Nombre del equipo"
          />
          <p>{errors.equipo}</p>
          <button type="submit">Enviar</button>
        </>
      )}
    </form>
  );
}
```
