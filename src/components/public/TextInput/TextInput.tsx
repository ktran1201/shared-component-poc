import React, {ChangeEvent, HTMLInputTypeAttribute, ReactNode} from "react";
import {Color, Size} from "../../../theme";
import {PrivateTextInput} from "../../private/PrivateTextInput";

interface StyleOverrides {
  color: string;
  fontSize: string;
}

export interface TextInputStyleOverrides {
  root: StyleOverrides;
  label: StyleOverrides;
  input: StyleOverrides;
}

export interface TextInputTextOverrides {
  label: string;
}

interface TextInputProps {
  name: string;
  id: string;
  autoComplete?: string;
  value?: number | string;
  disabled?: boolean;
  /**
   * If true, the TextInput is displayed in an error state.
   * Error message can be provided via `helperText`
   */
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute | undefined | 'currency';

  styleOverrides?: TextInputStyleOverrides;
  textOverrides?: TextInputTextOverrides;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;

  color?: Color;
  fontSize?: Size;

  // PrivateTextInput props
  toUpperCase?: boolean;
  hyperlinkElement?: any;
  appendComponent?: ReactNode;
  prependComponent?: ReactNode;
  editButton?: React.ReactNode;
  setCurrencyValue?: (value: string | undefined) => void;
  maxLength?: number;
  isLoading?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  id,
  autoComplete,
  value,
  disabled,
  error,
  helperText,
  label,
  placeholder,
  required,
  type,
  onChange,
  styleOverrides,
  textOverrides,
  color,
  fontSize,

  toUpperCase,
  hyperlinkElement,
  appendComponent,
  prependComponent,
  editButton,
  setCurrencyValue,
  maxLength,
  isLoading,
}) => {


  return (
    <>
      <PrivateTextInput
        name={name}
        id={id}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        error={error ? helperText : ''}
        helperText={!error ? helperText : ''}
        label={label}
        placeholder={placeholder}
        isRequired={required}
        type={type}
        onChange={onChange}
        styleOverrides={styleOverrides}
        textOverrides={textOverrides}
        color={color}
        fontSize={fontSize}

        toUpperCase={toUpperCase}
        hyperlinkElement={hyperlinkElement}
        appendComponent={appendComponent}
        prependComponent={prependComponent}
        editButton={editButton}
        setCurrencyValue={setCurrencyValue}
        maxLength={maxLength}
        isLoading={isLoading}
      />
    </>

  );
};

export default TextInput;
