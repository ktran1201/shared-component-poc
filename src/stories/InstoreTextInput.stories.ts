import type { Meta, StoryObj } from "@storybook/react";

import { InstoreTextInput } from "../components/private/InstoreTextInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shared components/InstoreTextInput",
  component: InstoreTextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof InstoreTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const defaults: Story = {
  args: {
    name: "first-name",
    id: "first-name",
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
