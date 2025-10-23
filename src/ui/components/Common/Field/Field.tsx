import React from "react";
import { ShowPasswordButton } from "@ui/components/ShowPasswordButton/ShowPasswordButton";
import styles from "./Field.module.scss";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPasswordField?: boolean;
}

// Usar forwardRef para que React Hook Form pueda pasar ref
export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, isPasswordField, ...props }, ref) => {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={props.name}>
          {label}
        </label>
        <input className={styles.input} id={props.name} ref={ref} {...props} />
        {isPasswordField && (
          <ShowPasswordButton
            visible={props.type === "text"}
            onClick={() => {
              props.type = props.type === "text" ? "password" : "text";
            }}
            ariaLabel={
              props.type === "text" ? "Ocultar contraseña" : "Ver contraseña"
            }
          />
        )}
        {error && <span className={styles.span}>{error}</span>}
      </div>
    );
  },
);

/// Asignar un displayName para facilitar la depuración
/// cuando se usa con React.forwardRef y evitar warnings
Field.displayName = "Field";
