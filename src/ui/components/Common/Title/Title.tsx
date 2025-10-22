import React, { JSX } from "react";
import styles from "./Title.module.scss";

interface TitleProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "left" | "center" | "right";
}

export const Title: React.FC<TitleProps> = ({
  children,
  level = 1,
  align = "left",
}) => {
  ///el jsx intrinsic elements permite usar etiquetas HTML dinámicamente
  ///en este caso se usa para crear un título con el nivel especificado
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const alignmentClass =
    align === "left"
      ? styles.alignLeft
      : align === "center"
        ? styles.alignCenter
        : styles.alignRight;
  return (
    <Tag className={`${styles[`title${level}`]} ${alignmentClass}`}>
      {children}
    </Tag>
  );
};
