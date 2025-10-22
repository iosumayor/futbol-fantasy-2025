import React, { JSX } from "react";
import styles from "./Title.module.scss";

interface TitleProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title: React.FC<TitleProps> = ({ children, level = 1 }) => {
  ///el jsx intrinsic elements permite usar etiquetas HTML dinámicamente
  ///en este caso se usa para crear un título con el nivel especificado
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`${styles[`title${level}`]}`}>{children}</Tag>;
};
