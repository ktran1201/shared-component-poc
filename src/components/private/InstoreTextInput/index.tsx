// Stability: Experimental
//! Todo ToolTips
import React, {
  HTMLInputTypeAttribute,
  ReactNode,
  useMemo,
  useState,
} from "react";

import classNames from "classnames";
import CurrencyInput from "react-currency-input-field";
import { HTMLProps } from "../../../utils/htmlProps";
import Loader, { LoaderSize } from "../Loader";
import FieldLabel from "../FieldLabel";
import ErrorMessage from "../ErrorMessage";

import styles from "./TextInput.module.scss";
import { DataTestId } from "../PrivateTextInput";

export interface InstoreTextInputProps
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
  size?: "md" | "lg";
  label?: string;
  tooltip?: string;
  helperText?: string;
  disabled?: boolean;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputContainerClassName?: string;
  toUpperCase?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  hyperlinkElement?: any;
  appendComponent?: ReactNode;
  prependComponent?: ReactNode;
  editButton?: React.ReactNode;
  fullWidth?: boolean;
  setCurrencyValue?: (value: string | undefined) => void;
}

export const InstoreTextInput = React.forwardRef<
  HTMLInputElement,
  InstoreTextInputProps
>(
  (
    {
      label = "",
      type = "text",
      size = "md",
      // tooltip,
      helperText,
      error = "",
      onChange: _onChange,
      inputClassName = "",
      containerClassName,
      labelClassName = "",
      toUpperCase,
      isLoading,
      isRequired = false,
      hyperlinkElement,
      appendComponent,
      prependComponent,
      inputContainerClassName,
      editButton,
      fullWidth,
      dataTestId,
      setCurrencyValue,
      ...props
    },
    ref,
  ) => {
    const id = React.useId();
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
      className: classNames(styles.input, inputClassName, {
        [styles.inputError]: !!error,
        [styles.sizeLarge]: size === "lg",
      }),
      type,
      onChange,
      ref,
      "data-test-id": `${dataTestId}-text-input`,
      style: inlineInputStyles,
      ...props,
      "aria-describedby": `${id}-error-helper`,
    };

    return (
      <div
        data-test-id={`${dataTestId}-text-input-container`}
        className={classNames(
          styles.textInputContainer,
          containerClassName,
          fullWidth ? "fullWidth" : "",
        )}
      >
        <div className={styles.header}>
          {label && (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
              data-test-id={`${dataTestId}-text-input-label`}
              htmlFor={id}
              className={classNames(
                styles.label,
                error ? styles.labelError : "",
                labelClassName,
              )}
            >
              <FieldLabel isRequired={isRequired} label={label} />
              {/** tooltip && <Tooltip text={tooltip} ariaLabel={name} /> */}
            </label>
          )}
          {editButton}
        </div>

        <div
          className={classNames(inputContainerClassName, styles.inputContainer)}
        >
          {prependComponent && (
            <div
              className={styles.prependComponentContainer}
              ref={setPrependComponentRef}
            >
              {prependComponent}
            </div>
          )}
          {type === "currency" && !!setCurrencyValue ? (
            <CurrencyInput
              name="input-name"
              decimalsLimit={2}
              prefix="$"
              onValueChange={(value) => setCurrencyValue(value)}
              {...inputProps}
            />
          ) : (
            <input {...inputProps} />
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
          <div
            id={`${id}-error-helper`}
            data-test-id={`${dataTestId}-text-input-error-helper`}
            className={classNames(
              styles.helperText,
              error ? styles.fieldError : "",
            )}
          >
            {error ? <ErrorMessage message={error} /> : helperText}
          </div>
        )}
        {!(error || helperText) && hyperlinkElement}
      </div>
    );
  },
);

InstoreTextInput.displayName = "TextInput";

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
