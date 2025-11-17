import styles from "./Fondo.module.scss";
import React from "react";

export const Fondo: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className={styles.fondo}>{children}</div>;
