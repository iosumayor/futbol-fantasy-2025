import React from "react";
import styles from "./ShowPasswordButton.module.scss";

interface ShowPasswordButtonProps {
  visible: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

export const ShowPasswordButton: React.FC<ShowPasswordButtonProps> = ({
  visible,
  onClick,
  ariaLabel,
}) => (
  <button
    type="button"
    className={styles.showPasswordButton}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {visible ? "🙈" : "👁️"}
  </button>
);
