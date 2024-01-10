import React, { HTMLInputTypeAttribute, ReactNode } from "react";
import { Color, Size } from "../../../theme";
import {
  DataTestId,
  PrivateTextInput,
} from "../../../private-components/PrivateTextInput";
import { HTMLProps } from "../../../utils/htmlProps";

interface StyleOverrides {
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  margin?: string;
}

export interface TextInputStyleOverrides {
  root?: StyleOverrides;
  label?: StyleOverrides;
  input?: StyleOverrides;
  helperText?: StyleOverrides;
}

export interface TextInputTextOverrides {
  label: string;
}

export interface TextInputProps
  extends HTMLProps<
      "input",
      | "name"
      | "placeholder"
      | "autoComplete"
      | "id"
      | "onKeyDown"
      | "onBlur"
      | "onChange"
      | "value"
      | "disabled"
      | "maxLength"
      | "minLength"
    >,
    DataTestId {
  // Name is our main identifier for property the value will map to
  error?: string;
  type?: HTMLInputTypeAttribute | undefined | "currency";
  label?: string;
  tooltip?: string;
  helperText?: string;
  disabled?: boolean;
  toUpperCase?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  hyperlinkElement?: any;
  appendComponent?: ReactNode;
  prependComponent?: ReactNode;
  editButton?: React.ReactNode;
  setCurrencyValue?: (value: string | undefined) => void;

  styleOverrides?: TextInputStyleOverrides;
  textOverrides?: TextInputTextOverrides;

  color?: Color;
  fontSize?: Size;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      name,
      dataTestId,
      autoComplete,
      value,
      disabled,
      error,
      helperText,
      label,
      placeholder,
      isRequired,
      type,
      onChange,
      onBlur,
      onKeyDown,
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
      minLength,
      maxLength,
      isLoading,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <PrivateTextInput
          name={name}
          dataTestId={dataTestId}
          autoComplete={autoComplete}
          value={value}
          disabled={disabled}
          error={error}
          helperText={helperText}
          label={label}
          placeholder={placeholder}
          isRequired={isRequired}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
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
          minLength={minLength}
          maxLength={maxLength}
          isLoading={isLoading}
          {...props}
          ref={ref}
        />
      </>
    );
  },
);

export default TextInput;
