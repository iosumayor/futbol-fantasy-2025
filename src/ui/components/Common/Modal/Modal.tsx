import React from "react";
import styles from "./Modal.module.scss";
import { Button } from "../Button/Button";

// TODO: Faltaría hacer bien el manejo del onConfirm siendo opcional
interface ModalProps {
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  confirmText: string;
  backText: string;
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  onConfirm,
  children,
  confirmText,
  backText,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
        <div className={styles.modalActions}>
          <Button variant="red" onClick={onClose}>
            {backText}
          </Button>
          <Button variant="green" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
