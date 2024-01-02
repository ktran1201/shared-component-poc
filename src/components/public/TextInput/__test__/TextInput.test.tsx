import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextInput } from "../index";
import { userEvent } from "@testing-library/user-event";

describe("TextInput", () => {
  const onChangeSpy = vi.fn();

  const renderTest = (props: any) => {
    render(
      <TextInput
        name="first-name"
        id="first-name"
        onChange={onChangeSpy}
        label="First name"
        {...props}
      />,
    );
  };

  describe("rendering", () => {
    it("should render the label", () => {
      renderTest({});
      expect(screen.getByText("First name")).toBeInTheDocument();
    });

    it("should render provided value", () => {
      renderTest({ value: "upstart" });
      expect(screen.getByDisplayValue("upstart")).toBeInTheDocument();
    });

    it("should disable input when disabled prop is provided", () => {
      renderTest({ disabled: true });
      const input = screen.getByLabelText("First name");
      expect(input).toBeDisabled();
    });

    it("should display helper text when provided", () => {
      const helperText = "please enter your first name";
      renderTest({ helperText });
      expect(screen.getByText(helperText)).toBeInTheDocument();
    });

    it("should display as error message when helper text is provided and error flag is true", () => {
      const helperText = "please enter your first name";
      renderTest({ helperText, error: true, dataTestId: "login-form" });
      expect(
        screen.getByTestId("login-form-error-message"),
      ).toBeInTheDocument();
    });

    it('should show word "Required" when input is required', () => {
      renderTest({ required: true });
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("should display as currency when type is currency and currency setter is provided", () => {
      renderTest({ type: "currency", setCurrencyValue: () => {}, value: 100 });
      expect(screen.getByDisplayValue("$100")).toBeInTheDocument();
    });

    it("should display overrode label when provided", () => {
      const overrodeLabel = "First name (overrode)";
      renderTest({ textOverrides: { label: overrodeLabel } });
      expect(screen.getByText(overrodeLabel)).toBeInTheDocument();
    });
  });

  describe("event", () => {
    it("should call onChangeSpy when typing", async () => {
      renderTest({});

      const input = screen.getByLabelText("First name");

      await userEvent.type(input, "abc");

      expect(onChangeSpy).toHaveBeenCalledTimes(3);
    });
  });
});
