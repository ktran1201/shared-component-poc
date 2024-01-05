import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "../components/public/TextInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shared components/TextInput",
  component: TextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const defaults: Story = {
  args: {
    name: "first-name",
    dataTestId: "first-name",
    autoComplete: "off",
    value: "Upstart",
    disabled: false,
    error: "",
    helperText: "please type your first name",
    label: "First name",
    placeholder: "First name",
    isRequired: true,
    isLoading: false,
    type: "text",
    onChange: (e) => {
      console.log(e.target.value);
    },
    setCurrencyValue: (cur) => {
      console.log("currency", cur);
    },
  },
};

export const withOverrides: Story = {
  args: {
    name: "first-name",
    dataTestId: "first-name",
    autoComplete: "off",
    value: "Upstart",
    disabled: false,
    error: "",
    helperText: "please type your first name",
    label: "First name",
    placeholder: "First name",
    isRequired: true,
    isLoading: false,
    type: "text",
    onChange: (e) => {
      console.log(e.target.value);
    },
    styleOverrides: {
      root: {
        width: "100%",
        color: "red",
      },
      label: {
        color: "red",
        fontSize: "30px",
      },
      input: {
        color: "green",
        fontSize: "20px",
      },
      helperText: {
        color: "blue",
        fontSize: "18px",
      },
    },
    textOverrides: {
      label: "first name (override)",
    },
    setCurrencyValue: (cur) => {
      console.log("currency", cur);
    },
  },
};
