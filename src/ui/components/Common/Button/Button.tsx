import React from "react";
import styles from "./Button.module.scss";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "blue" | "red" | "navBar";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "blue",
  ...props
}) => {
  const variantClassMap = {
    blue: styles.blueButton,
    red: styles.redButton,
    navBar: styles.navButton,
  };

  const buttonClass = variantClassMap[variant] ?? styles.blueButton; // Default to blueButton if variant not found

  return (
    <button type={type} {...props} className={buttonClass}>
      {children}
    </button>
  );
};
