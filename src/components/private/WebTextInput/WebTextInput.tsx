import classNames from 'classnames';
import React, { useRef, useEffect, ChangeEvent, FocusEvent } from 'react';
// import Loader from '../Loader';
import FieldLabel from '../FieldLabel';
// import Tooltip from '../Tooltip';
import ErrorMessage from '../ErrorMessage';
import {TextInputStyleOverrides} from "../../public/TextInput/TextInput";
import styled from "styled-components";

declare global {
  interface DataTestId {
    'data-test-id'?: string;
  }
}

export interface WebTextInputProps extends DataTestId {
  autoComplete?: string;
  // Name is our main identifier for property the value will map to
  name: string;
  error?: string;
  label?: string;
  tooltip?: string;
  type?: string;
  helperText?: string;
  placeholder?: string;

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

  styleOverrides?: TextInputStyleOverrides;
  color?: string;
}

const $colorInputBorderGrey = '#919191';
const $colorBlackLight = 'grey';
const $colorPrimaryMed = 'blue';

export const $defaultColor = '#000000';
export const $defaultFontSize = '16px';


const StyledWebTextInput = styled.div<WebTextInputProps>`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => (props.styleOverrides?.fontSize || $defaultFontSize)};
  color: ${(props) => (props.styleOverrides?.color || props.color || $defaultColor)};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;

const StyledLabel = styled.label<WebTextInputProps>`
  font-size: ${(props) => (props.styleOverrides?.fontSize || $defaultFontSize)};
  color: ${(props) => (props.styleOverrides?.color || props.color || $defaultColor)};
  margin-bottom: 18px;
`;

const StyleInput = styled.input<WebTextInputProps>`
  font-size: ${(props) => (props.styleOverrides?.fontSize || $defaultFontSize)};
  color: ${(props) => (props.styleOverrides?.color || props.color || $defaultColor)};
  border-radius: 8px;
  border: 1px solid ${$colorInputBorderGrey};
  padding: 8px 16px;
  font-size: 16px;
  height: 20px;
  
  &:focus {
    outline: transparent;
    border-color: ${$colorPrimaryMed};
  }

  &:disabled {
    color: ${$colorBlackLight};
  }
`;

const WebTextInput = ({
  name,
  label = '',
  type = 'text',
  value = '',
  helperText,
  placeholder = '',
  disabled = false,
  autoComplete,
  onChange,
  onBlur,
  error = '',
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
  editButton,
  fullWidth,
  max,
  min,
  validate,
  styleOverrides = {},
                        color
}: WebTextInputProps) => {
  const inputRef = useRef<any>(null);
  const { root: rootStyleOverrides, label: labelStyleOverrides, input: inputStyleOverrides} = styleOverrides;
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
    <StyledWebTextInput
      data-test-id={`${dataTestId}-text-input-container`}
      styleOverrides={rootStyleOverrides}
      fullWidth={fullWidth}
      primary={true}
      color={color}
    >
      <div className="prodigy-text-input-header">
        {label && (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <StyledLabel
            data-test-id={`${dataTestId}-text-input-label`}
            htmlFor={id || name}
            styleOverrides={labelStyleOverrides}
            color={color}
          >
            <FieldLabel isRequired={isRequired} label={label} />
            {/*{tooltip && <Tooltip text={tooltip} ariaLabel={name} />}*/}
          </StyledLabel>
        )}
        {editButton}
      </div>

      <div
        className={classNames(
          'currency-input-container',
        )}
      >
        {currency && <span className="currency-symbol">{currency}</span>}
        {prependComponent}
        <StyleInput
          ref={inputRef}
          id={id || name}
          {...defaultProps}
          {...props}
          aria-describedby={`${id || name}-error-helper`}
          styleOverrides={inputStyleOverrides}
          color={color}
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
    </StyledWebTextInput>
  );
};

export default WebTextInput;
