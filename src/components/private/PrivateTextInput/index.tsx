// Stability: Experimental
//! Todo ToolTips
import React, {
  HTMLInputTypeAttribute,
  ReactNode,
  useMemo,
  useState,
} from 'react';

import classNames from 'classnames';
import CurrencyInput from 'react-currency-input-field';

import styles from './TextInput.module.scss';

import {HTMLProps} from "../../../utils/htmlProps";
import {TextInputStyleOverrides, TextInputTextOverrides} from "../../public/TextInput/TextInput";
import styled from "styled-components";
import Loader, {LoaderSize} from "../Loader";
import FieldLabel from "../FieldLabel";
import ErrorMessage from "../ErrorMessage";
import chroma from "chroma-js";

export interface PrivateTextInputProps
  extends HTMLProps<
      'input',
      | 'name'
      | 'placeholder'
      | 'autoComplete'
      | 'id'
      | 'onKeyDown'
      | 'onBlur'
      | 'onChange'
      | 'value'
      | 'disabled'
      | 'maxLength'
      | 'minLength'
    >,
    DataTestId {
  // Name is our main identifier for property the value will map to
  error?: string;
  type?: HTMLInputTypeAttribute | undefined | 'currency';
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
}

// TODO: generate these colors in the way that scss did
const $colorBlackMed = 'rgba(51, 51, 51, 0.6)';
const $colorPrimaryDark = '#1a6664';
const $colorErrorDark = '#d71974';
const $colorInputBorderGrey = '#919191';
const $colorBlackLight = 'rgba(51, 51, 51, 0.38)';

// const $colorPrimaryMed = hsl(
//   $hue: hue($colorPrimaryDark),
//   $saturation: 42%,
//   $lightness: 36%,
// );

const $colorPrimaryMed = chroma.hsl(chroma($colorPrimaryDark).hsl()[0], 0.42, 0.36).hex();

const $inputErrorLabel = `
  color: ${$colorErrorDark};
  font-size: 10px;
  opacity: 1;
`;

const $input = `
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${$colorInputBorderGrey};
  padding: 8px 16px;
  font-size: 16px;

  &.sizeLarge {
    padding: 12px;
    line-height: 24px;
  }

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
`

const StyledCurrencyInput = styled(CurrencyInput)<PrivateTextInputProps>`
  ${$input}
  ${props => props.styleOverrides?.color && `color: ${props.styleOverrides?.color}; `  }
  ${props => props.styleOverrides?.fontSize && `font-size: ${props.styleOverrides?.fontSize};`  }
  ${props => props.error && `border-color: ${$colorErrorDark};`  }
`;

const Input = styled.input<PrivateTextInputProps>`
  ${$input}
  
  ${props => props.styleOverrides?.color && `color: ${props.styleOverrides?.color}; `  }
  ${props => props.styleOverrides?.fontSize && `font-size: ${props.styleOverrides?.fontSize};`  }
  ${props => props.error && `border-color: ${$colorErrorDark};`  }
`;

const Label = styled.label<PrivateTextInputProps>`
  font-size: 12px;
  color: ${$colorBlackMed};
  margin-bottom: 8px;
  ${props => props.styleOverrides?.color && `color: ${props.styleOverrides?.color}; `  }
  ${props => props.styleOverrides?.fontSize && `font-size: ${props.styleOverrides?.fontSize};`  }
  ${props => props.error && `${$inputErrorLabel}`  }
`;


const HelperText = styled.div<PrivateTextInputProps>`
  margin: 2px 0px 0px;
  height: 12px;
  width: 100%;
  font-size: 10px;
  opacity: 1;
  color: ${$colorBlackMed};
  transition: opacity 0.2s;
  ${props => props.styleOverrides?.color && `color: ${props.styleOverrides?.color}; `  }
  ${props => props.styleOverrides?.fontSize && `font-size: ${props.styleOverrides?.fontSize};`  }
  ${props => props.error && `${$inputErrorLabel}`  }
`;


const StyledPrivateTextInput = styled.div<PrivateTextInputProps>`
  display: flex;
  flex-direction: column;
  ${props => props.styleOverrides?.width && `width: ${props.styleOverrides?.width};`}
  
  &:focus-within {
    ${HelperText} {
      opacity: 1;
    }
    
    ${Label} {
      color: ${$colorPrimaryMed};
    }
  }
`;

export const PrivateTextInput = React.forwardRef<HTMLInputElement, PrivateTextInputProps>(
  (
    {
      label = '',
      type = 'text',
      helperText,
      error = '',
      onChange: _onChange,
      toUpperCase,
      isLoading,
      isRequired = false,
      hyperlinkElement,
      appendComponent,
      prependComponent,
      editButton,
      fullWidth,
      dataTestId,
      setCurrencyValue,
      styleOverrides = {},
      textOverrides = {},
      ...props
    },
    ref,
  ) => {
    const { root: rootStyleOverrides, label: labelStyleOverrides, input: inputStyleOverrides, helperText: helperTextStyleOverrides} = styleOverrides;
    const { label: labelTextOverrides} = textOverrides;

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
      type,
      onChange,
      ref,
      'data-test-id': `${dataTestId}-text-input`,
      style: inlineInputStyles,
      ...props,
      'aria-describedby': `${id}-error-helper`,
      error,
      styleOverrides: inputStyleOverrides
    };

    return (
      <StyledPrivateTextInput
        data-test-id={`${dataTestId}-text-input-container`}
        styleOverrides={rootStyleOverrides}
      >
        <div className={styles.header}>
          {label && (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <Label
              data-test-id={`${dataTestId}-text-input-label`}
              htmlFor={id}
              styleOverrides={labelStyleOverrides}
              error={error}
              className={styles.label}
            >
              <FieldLabel isRequired={isRequired} label={label} />
              {/** tooltip && <Tooltip text={tooltip} ariaLabel={name} /> */}
            </Label>
          )}
          {editButton}
        </div>

        <div
          className={classNames(
            styles.inputContainer)}
        >
          {prependComponent && (
            <div
              className={styles.prependComponentContainer}
              ref={setPrependComponentRef}
            >
              {prependComponent}
            </div>
          )}
          {type === 'currency' && !!setCurrencyValue ? (
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
            data-test-id={`${dataTestId}-text-input-error-helper`}
            error={error}
            styleOverrides={helperTextStyleOverrides}
          >
            {error ? <ErrorMessage message={error} /> : helperText}
          </HelperText>
        )}
        {!(error || helperText) && hyperlinkElement}
      </StyledPrivateTextInput>
    );
  },
);

PrivateTextInput.displayName = 'PrivateTextInput';

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