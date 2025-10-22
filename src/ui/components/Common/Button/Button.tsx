import React from "react";
import styles from "./Button.module.scss";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "blue" | "red";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "blue",
  ...props
}) => {
  const buttonClass = variant === "blue" ? styles.blueButton : styles.redButton;
  return (
    <button type={type} {...props} className={buttonClass}>
      {children}
    </button>
  );
};
