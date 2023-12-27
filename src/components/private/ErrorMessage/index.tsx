import React from 'react';

import classNames from 'classnames';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<
  React.PropsWithChildren<ErrorMessageProps>
> = ({ message, children, className }) => {
  return (
    <>
      <span className={classNames(styles['ErrorMessage'], className)}>
        <span>{message}</span>
      </span>
      {children}
    </>
  );
};

export default ErrorMessage;
