import classNames from 'classnames';
import React from 'react';

interface ErrorMessageProps {
  message: string;
  component?: JSX.Element;
  className?: string;
}

const ErrorMessage = ({ message, component, className }: ErrorMessageProps) => {
  return (
    <>
      <span className={classNames('ErrorMessage', className)}>
        <span>Error - </span>
        <span>{message}</span>
      </span>
      {!!component && component}
    </>
  );
};

export default ErrorMessage;
