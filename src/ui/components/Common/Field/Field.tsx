import React from "react";
import { ShowPasswordButton } from "@ui/components/ShowPasswordButton/ShowPasswordButton";
import styles from "./Field.module.scss";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPasswordField?: boolean;
  onTogglePassword?: () => void;
}
// Usar forwardRef para que React Hook Form pueda pasar ref

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, isPasswordField, onTogglePassword, ...props }, ref) => {
    const inputId = props.id ?? props.name;
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        <input className={styles.input} ref={ref} {...props} id={inputId} />
        {isPasswordField && onTogglePassword && (
          <ShowPasswordButton
            visible={props.type === "text"}
            onClick={onTogglePassword}
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
