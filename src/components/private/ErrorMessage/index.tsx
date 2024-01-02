import React from "react";

import classNames from "classnames";

import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: string;
  dataTestId?: string;
  className?: string;
}

const ErrorMessage: React.FC<React.PropsWithChildren<ErrorMessageProps>> = ({
  message,
  children,
  className,
  dataTestId,
}) => {
  return (
    <>
      <span
        className={classNames(styles["ErrorMessage"], className)}
        data-testid={`${dataTestId}-error-message`}
      >
        <span>{message}</span>
      </span>
      {children}
    </>
  );
};

export default ErrorMessage;
