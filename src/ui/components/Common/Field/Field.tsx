import React from "react";
import styles from "./Field.module.scss";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// Usar forwardRef para que React Hook Form pueda pasar ref
export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={props.name}>
          {label}
        </label>
        <input className={styles.input} id={props.name} ref={ref} {...props} />
        {error && <span className={styles.span}>{error}</span>}
      </div>
    );
  },
);

/// Asignar un displayName para facilitar la depuración
/// cuando se usa con React.forwardRef y evitar warnings
Field.displayName = "Field";
