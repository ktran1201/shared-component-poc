// Stability: Experimental
//! Todo ToolTips
import React, { useContext, useMemo, useState } from "react";

import classNames from "classnames";

import styles from "./TextInput.module.scss";

import { TextInputProps } from "../../components/atoms/TextInput/TextInput";
import styled from "styled-components";
import Loader, { LoaderSize } from "../Loader";
import FieldLabel from "../FieldLabel";
import ErrorMessage from "../ErrorMessage";
import { ShareComponentsThemeContext } from "../../theme";
import {
  $colorBlackLight,
  $colorBlackMed,
  $colorErrorDark,
  $colorInputBorderGrey,
  $colorPrimaryMed,
} from "../../constants/styles";
import CurrencyInput from "react-currency-input-field";

export interface DataTestId {
  dataTestId?: string;
}

interface OverrideProps {
  $styleOverrides?: {
    color?: string;
    focusColor?: string;
    fontSize?: string;
    width?: string;
    height?: string;
  };
  $color?: string;
  $focusColor?: string;
  $fontSize?: string;
  $error?: string;
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

  color: ${(props) =>
    props.$styleOverrides?.color || props.$color || "#000000"};
  font-size: ${(props) =>
    props.$styleOverrides?.fontSize || props.$fontSize || "16px"};

  ${(props) => props.$error && `border-color: ${$colorErrorDark};`}

  &:focus {
    outline: transparent;
    border-color: ${(props) =>
      props.$styleOverrides?.focusColor ||
      props.$focusColor ||
      $colorPrimaryMed};
  }
`;

const Input = styled.input<OverrideProps>`
  ${$input}

  color: ${(props) =>
    props.$styleOverrides?.color || props.$color || "#000000"};
  font-size: ${(props) =>
    props.$styleOverrides?.fontSize || props.$fontSize || "16px"};

  ${(props) => props.$error && `border-color: ${$colorErrorDark};`}

  &:focus {
    outline: transparent;
    border-color: ${(props) =>
      props.$styleOverrides?.focusColor ||
      props.$focusColor ||
      $colorPrimaryMed};
  }
`;

const Label = styled.label<OverrideProps>`
  color: ${(props) =>
    props.$styleOverrides?.color || props.$color || $colorBlackMed};
  font-size: ${(props) =>
    props.$styleOverrides?.fontSize || props.$fontSize || "12px"};
  margin-bottom: 8px;
  ${(props) => props.$error && `${$inputErrorLabel}`}
`;

const HelperText = styled.div<OverrideProps>`
  margin: 2px 0 0;
  height: 12px;
  width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
  color: ${(props) =>
    props.$styleOverrides?.color || props.$color || $colorBlackMed};
  font-size: ${(props) =>
    props.$styleOverrides?.fontSize || props.$fontSize || "10px"};
  ${(props) => props.$error && `${$inputErrorLabel}`}
`;

const StyledPrivateTextInput = styled.div<OverrideProps>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.$styleOverrides?.width && `width: ${props.$styleOverrides?.width};`}
  ${(props) =>
    props.$styleOverrides?.height &&
    `height: ${props.$styleOverrides?.height};`}

  &:focus-within {
    ${HelperText} {
      opacity: 1;
    }

    ${Label} {
      color: ${(props) =>
        props.$styleOverrides?.color || props.$color || $colorPrimaryMed};
    }
  }
`;

export const PrivateTextInput = React.forwardRef<
  HTMLInputElement,
  TextInputProps
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

    const id = Date.now() + Math.floor(Math.random() * 10000) + "";
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
      type,
      onChange,
      ref,
      "data-testid": `${dataTestId}-text-input`,
      style: inlineInputStyles,
      ...props,
      "aria-describedby": `${dataTestId}-error-helper`,
      $error: error,
      $styleOverrides: inputStyleOverrides,
      $fontSize: themeFontSize,
      $focusColor: themeColor,
      id,
      className: "usc-text-input-input",
    };

    return (
      <StyledPrivateTextInput
        data-testid={`${dataTestId}-text-input-container`}
        $styleOverrides={rootStyleOverrides}
        $color={themeColor}
        className="usc-text-input-container"
      >
        <div className={`${styles.header} usc-text-input-header`}>
          {label && (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <Label
              data-testid={`${dataTestId}-text-input-label`}
              htmlFor={id}
              $styleOverrides={labelStyleOverrides}
              $error={error}
              className={`${styles.label} usc-text-input-label`}
              $fontSize={themeFontSize}
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
            $error={error}
            $styleOverrides={helperTextStyleOverrides}
            $fontSize={themeFontSize}
            className="usc-text-input-helper-text"
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
