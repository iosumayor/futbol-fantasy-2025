import React from "react";
import styles from "./Modal.module.scss";
import { Button } from "../Button/Button";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  confirmText: string;
  backText: string;
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  confirmText,
  backText,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
        <div className={styles.modalActions}>
          <Button variant="red" onClick={onClose}>
            {backText}
          </Button>
          <Button variant="green" onClick={() => {}}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
