// Stability: Experimental
//! Todo ToolTips
import React, {
  HTMLInputTypeAttribute,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import classNames from "classnames";
import CurrencyInput from "react-currency-input-field";

import styles from "./TextInput.module.scss";

import { HTMLProps } from "../../../utils/htmlProps";
import {
  TextInputStyleOverrides,
  TextInputTextOverrides,
} from "../../public/TextInput/TextInput";
import styled from "styled-components";
import Loader, { LoaderSize } from "../Loader";
import FieldLabel from "../FieldLabel";
import ErrorMessage from "../ErrorMessage";
import { Color, ShareComponentsThemeContext, Size } from "../../../theme";
import {
  $colorBlackLight,
  $colorBlackMed,
  $colorErrorDark,
  $colorInputBorderGrey,
  $colorPrimaryMed
} from "../../../constants/styles";

export interface DataTestId {
  dataTestId?: string;
}

export interface PrivateTextInputProps
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

interface OverrideProps {
  styleOverrides?: {
    color?: string;
    fontSize?: string;
    width?: string;
  };
  color?: string;
  fontSize?: string;
  error?: string;
}



const $inputErrorLabel = `
  color: ${$colorErrorDark};
  opacity: 1;
`;

const $input = `
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${$colorInputBorderGrey};
  padding: 8px 16px;

  &::placeholder {
    color: ${$colorBlackLight};
  }

  &:focus {
    outline: transparent;
    border-color: ${$colorPrimaryMed};
  }

  &:disabled {
    color: ${$colorBlackLight};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledCurrencyInput = styled(CurrencyInput)<OverrideProps>`
  ${$input}

  color: ${(props) => props.styleOverrides?.color || props.color || "#000000"};
  font-size: ${(props) =>
    props.styleOverrides?.fontSize || props.fontSize || "16px"};

  ${(props) => props.error && `border-color: ${$colorErrorDark};`}
`;

const Input = styled.input<OverrideProps>`
  ${$input}

  color: ${(props) => props.styleOverrides?.color || props.color || "#000000"};
  font-size: ${(props) =>
    props.styleOverrides?.fontSize || props.fontSize || "16px"};

  ${(props) => props.error && `border-color: ${$colorErrorDark};`}
`;

const Label = styled.label<OverrideProps>`
  color: ${(props) =>
    props.styleOverrides?.color || props.color || $colorBlackMed};
  font-size: ${(props) =>
    props.styleOverrides?.fontSize || props.fontSize || "12px"};
  margin-bottom: 8px;
  ${(props) => props.error && `${$inputErrorLabel}`}
`;

const HelperText = styled.div<OverrideProps>`
  margin: 2px 0 0;
  height: 12px;
  width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
  color: ${(props) =>
    props.styleOverrides?.color || props.color || $colorBlackMed};
  font-size: ${(props) =>
    props.styleOverrides?.fontSize || props.fontSize || "10px"};
  ${(props) => props.error && `${$inputErrorLabel}`}
`;

const StyledPrivateTextInput = styled.div<OverrideProps>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.styleOverrides?.width && `width: ${props.styleOverrides?.width};`}

  &:focus-within {
    ${HelperText} {
      opacity: 1;
    }

    ${Label} {
      color: ${(props) =>
  props.styleOverrides?.color || props.color || $colorPrimaryMed};
    }
  }
`;

export const PrivateTextInput = React.forwardRef<
  HTMLInputElement,
  PrivateTextInputProps
>(
  (
    {
      dataTestId,
      label = "",
      type = "text",
      helperText,
      error = "",
      onChange: _onChange,
      toUpperCase,
      isLoading,
      isRequired = false,
      hyperlinkElement,
      appendComponent,
      prependComponent,
      editButton,
      setCurrencyValue,
      styleOverrides = {},
      textOverrides = {},
      color,
      fontSize,
      ...props
    },
    ref,
  ) => {
    const {
      root: rootStyleOverrides,
      label: labelStyleOverrides,
      input: inputStyleOverrides,
      helperText: helperTextStyleOverrides,
    } = styleOverrides;
    const { label: labelTextOverrides } = textOverrides;

    const theme = useContext(ShareComponentsThemeContext);
    const themeColor = color ? theme?.colors?.[color] : undefined;
    const themeFontSize = fontSize ? theme?.fontSizes?.[fontSize] : undefined;
    console.log("theme", theme);
    console.log("color", color);
    console.log("fontSize", fontSize);

    const id = Date.now() + '';
    const { setPrependComponentRef, setAppendComponentRef, inlineInputStyles } =
      useInlineComponents();

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { target } = e;
      if (toUpperCase) {
        target.value = target.value.toUpperCase();
      }

      if (props.maxLength) {
        target.value = target.value.slice(0, props.maxLength);
      }

      if (_onChange) {
        _onChange(e);
      }
    };

    const inputProps = {
      id,
      type,
      onChange,
      ref,
      "data-testid": `${dataTestId}-text-input`,
      style: inlineInputStyles,
      ...props,
      "aria-describedby": `${dataTestId}-error-helper`,
      error,
      styleOverrides: inputStyleOverrides,
      color: themeColor,
      fontSize: themeFontSize,
    };

    return (
      <StyledPrivateTextInput
        data-testid={`${dataTestId}-text-input-container`}
        styleOverrides={rootStyleOverrides}
        color={themeColor}
      >
        <div className={styles.header}>
          {label && (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <Label
              data-testid={`${dataTestId}-text-input-label`}
              htmlFor={id}
              styleOverrides={labelStyleOverrides}
              error={error}
              className={styles.label}
              color={themeColor}
              fontSize={themeFontSize}
            >
              <FieldLabel
                isRequired={isRequired}
                label={labelTextOverrides || label}
              />
              {/** tooltip && <Tooltip text={tooltip} ariaLabel={name} /> */}
            </Label>
          )}
          {editButton}
        </div>

        <div className={classNames(styles.inputContainer)}>
          {prependComponent && (
            <div
              className={styles.prependComponentContainer}
              ref={setPrependComponentRef}
            >
              {prependComponent}
            </div>
          )}
          {type === "currency" && !!setCurrencyValue ? (
            <StyledCurrencyInput
              name="input-name"
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => setCurrencyValue(value)}
              {...inputProps}
            />
          ) : (
            <Input {...inputProps} />
          )}
          {(appendComponent || isLoading) && (
            <div
              className={styles.appendComponentContainer}
              ref={setAppendComponentRef}
            >
              {isLoading && <Loader size={LoaderSize.SMALL} />}
              {appendComponent}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <HelperText
            id={`${id}-error-helper`}
            data-testid={`${dataTestId}-text-input-error-helper`}
            error={error}
            styleOverrides={helperTextStyleOverrides}
            color={themeColor}
            fontSize={themeFontSize}
          >
            {error ? (
              <ErrorMessage message={error} dataTestId={dataTestId} />
            ) : (
              helperText
            )}
          </HelperText>
        )}
        {!(error || helperText) && hyperlinkElement}
      </StyledPrivateTextInput>
    );
  },
);

PrivateTextInput.displayName = "PrivateTextInput";

/**
 * Custom hook to calculate prepended / appending component widths to be able to
 * calculate left/right padding to apply to the input component.
 * @returns
 */
function useInlineComponents(): {
  setPrependComponentRef: (ref: HTMLDivElement) => void;
  setAppendComponentRef: (ref: HTMLDivElement) => void;
  inlineInputStyles: React.CSSProperties;
} {
  const [prependComponentRef, setPrependComponentRef] =
    useState<HTMLDivElement | null>(null);
  const [appendComponentRef, setAppendComponentRef] =
    useState<HTMLDivElement | null>(null);

  const inlineInputStyles = useMemo(() => {
    const inlineStyles: React.CSSProperties = {};

    if (prependComponentRef) {
      const dimensions = prependComponentRef.getBoundingClientRect();
      inlineStyles.paddingLeft = Math.ceil(dimensions.width);
    }

    if (appendComponentRef) {
      const dimensions = appendComponentRef.getBoundingClientRect();
      inlineStyles.paddingRight = Math.ceil(dimensions.width);
    }

    return inlineStyles;
  }, [prependComponentRef, appendComponentRef]);

  return {
    setPrependComponentRef,
    setAppendComponentRef,
    inlineInputStyles,
  };
}
