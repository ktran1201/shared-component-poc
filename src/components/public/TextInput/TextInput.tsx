import React, {ChangeEvent} from "react";
import WebTextInput from "../../private/WebTextInput";

interface StyleOverrides {
  color: string;
  fontSize: string;
}

export interface TextInputStyleOverrides {
  root: StyleOverrides;
  label: StyleOverrides;
  input: StyleOverrides;
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
  fullWidth?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  /**
   * currently support only text and number
   */
  type?: 'text' | 'number';

  styleOverrides?: TextInputStyleOverrides;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  id,
  autoComplete,
  value,
  disabled,
  error,
  fullWidth,
  helperText,
  label,
  placeholder,
  required,
  type,
  onChange,
  styleOverrides
}) => {
  return (
    <WebTextInput
      name={name}
      id={id}
      autoComplete={autoComplete}
      value={value}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={helperText}
      label={label}
      placeholder={placeholder}
      isRequired={required}
      type={type}
      onChange={onChange}
      styleOverrides={styleOverrides}
    />
  );
};

export default TextInput;
