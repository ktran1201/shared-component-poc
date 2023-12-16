import React, {ChangeEvent, useContext} from "react";
import WebTextInput from "../../private/WebTextInput";
import {TextField} from "@mui/material";
import {
  $defaultColor,
  $defaultFontSize, $defaultInputBgColor,
  $defaultLabelBgColor,
  $defaultRootBgColor
} from "../../private/WebTextInput/WebTextInput";
import {AppThemeContext} from "../../../consumer/useTheme";

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

  color: string
  useWebComponent?: boolean;
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
  styleOverrides,
  color,
                                               useWebComponent,
}) => {
  const theme = useContext(AppThemeContext);
  console.log("theme", theme)
  const colorValue = theme?.color?.[color];

  if (useWebComponent) {
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
        color={colorValue}
      />
    );
  }


  const { root: rootStyleOverrides, label: labelStyleOverrides, input: inputStyleOverrides} = styleOverrides || {};

  const sx = {
      color: rootStyleOverrides?.color || colorValue || $defaultColor,
      fontSize: rootStyleOverrides?.fontSize || $defaultFontSize,

    '& .MuiFormLabel-root': {
      color: labelStyleOverrides?.color || colorValue || $defaultColor,
      fontSize: labelStyleOverrides?.fontSize || $defaultFontSize,
    },

    '& .MuiInputBase-root': {
      color: inputStyleOverrides?.color || colorValue || $defaultColor,
      fontSize: inputStyleOverrides?.fontSize || $defaultFontSize,
    }
  }

  console.log("sx", sx)

  return <TextField
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
    sx={sx}
    color="warning"
  />
};

export default TextInput;
