import classNames from 'classnames';
import React, { useRef, useEffect, ChangeEvent, FocusEvent } from 'react';
// import Loader from '../Loader';
import FieldLabel from '../FieldLabel';
// import Tooltip from '../Tooltip';
import ErrorMessage from '../ErrorMessage';

declare global {
  interface DataTestId {
    'data-test-id'?: string;
  }
}

export interface WebTextInputProps extends DataTestId {
  // Name is our main identifier for property the value will map to
  name: string;
  error?: string;
  label?: string;
  tooltip?: string;
  type?: string;
  helperText?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  currency?: string;
  // Overrides
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  value: number | string | undefined;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  maxLength?: number;
  minLength?: number;
  toUpperCase?: boolean;
  onKeyDown?: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  isRequired?: boolean;
  id?: string;
  hyperlinkElement?: any;
  appendComponent?: JSX.Element;
  prependComponent?: JSX.Element;
  inputContainerClassName?: string;
  editButton?: React.ReactNode;
  fullWidth?: boolean;
  min?: number;
  max?: number;
  validate?: Function;
}

const WebTextInput = ({
  name,
  label = '',
  type = 'text',
  tooltip,
  value = '',
  helperText,
  placeholder = '',
  disabled = false,
  autoComplete,
  onChange,
  onBlur,
  error = '',
  inputClassName = '',
  containerClassName,
  labelClassName = '',
  currency = '',
  'data-test-id': dataTestId = '',
  maxLength,
  minLength,
  toUpperCase,
  onKeyDown,
  isLoading,
  isRequired = false,
  id,
  hyperlinkElement,
  appendComponent,
  prependComponent,
  inputContainerClassName,
  editButton,
  fullWidth,
  max,
  min,
  validate,
}: WebTextInputProps) => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current && validate) {
      inputRef.current.addEventListener('input', () => {
        // Run validation and set error message if needed
        if (validate(inputRef.current.value)) {
          inputRef.current.setCustomValidity('');
        } else {
          inputRef.current.setCustomValidity(
            `Please enter a valid ${label?.toLowerCase()}`
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef, label, validate]);

  const props: any = {};
  if (maxLength) {
    props.maxLength = maxLength;
  }
  if (minLength) {
    props.minLength = minLength;
  }
  if (onKeyDown) {
    props.onKeyDown = onKeyDown;
  }

  if (type === 'number' && max) {
    props.max = max;
  }

  if (type === 'number' && min) {
    props.max = min;
  }

  const defaultProps = {
    className: classNames({
      'prodigy-text-input': true,
      'prodigy-text-input-error': error,
      [inputClassName]: !!inputClassName,
    }),
    'data-test-id': `${dataTestId}-text-input`,
    placeholder,
    autoComplete,
    name,
    type,
    onBlur,
    onChange: (e) => {
      const { target } = e;
      if (type === 'number') {
        if (target.value.length > 1 && target.value.startsWith('0')) {
          target.value = parseFloat(target.value);
        }
      }
      if (toUpperCase) {
        target.value = target.value.toUpperCase();
      }
      onChange(e);
    },
    value,
    disabled,
  };

  return (
    <div
      data-test-id={`${dataTestId}-text-input-container`}
      className={classNames(
        'prodigy-text-input-container',
        containerClassName,
        fullWidth ? 'fullWidth' : ''
      )}
    >
      <div className="prodigy-text-input-header">
        {label && (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            data-test-id={`${dataTestId}-text-input-label`}
            htmlFor={id || name}
            className={classNames(
              'prodigy-text-input-label',
              error ? 'prodigy-label-error' : '',
              labelClassName
            )}
          >
            <FieldLabel isRequired={isRequired} label={label} />
            {/*{tooltip && <Tooltip text={tooltip} ariaLabel={name} />}*/}
          </label>
        )}
        {editButton}
      </div>

      <div
        className={classNames(
          'currency-input-container',
          inputContainerClassName
        )}
      >
        {currency && <span className="currency-symbol">{currency}</span>}
        {prependComponent}
        <input
          ref={inputRef}
          id={id || name}
          {...defaultProps}
          {...props}
          aria-describedby={`${id || name}-error-helper`}
        />
        {isLoading && "Loading"}
        {appendComponent}
      </div>

      {(error || helperText) && (
        <div
          id={`${id || name}-error-helper`}
          data-test-id={`${dataTestId}-text-input-error-helper`}
          className={classNames(
            'prodigy-text-input-helper',
            error ? 'prodigy-field-error' : ''
          )}
        >
          {error ? <ErrorMessage message={error} /> : helperText}
        </div>
      )}
      {!(error || helperText) && hyperlinkElement}
    </div>
  );
};

export default WebTextInput;
