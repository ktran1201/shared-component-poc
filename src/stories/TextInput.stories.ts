import type { Meta, StoryObj } from '@storybook/react';

import {TextInput} from "../components/public/TextInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared components/TextInput',
  component: TextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const useWebComponentDefault: Story = {
  args: {
    name: 'first-name',
    id: 'first-name',
    autoComplete: 'off',
    value: "kevin",
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: 'please type your first name',
    label: 'First name',
    placeholder: 'First name',
    required: true,
    type: 'text',
    onChange: (e) => {
      console.log(e.target.value)
    },
    useWebComponent: true
  },
};

export const useWebComponentOverride: Story = {
  args: {
    name: 'first-name',
    id: 'first-name',
    autoComplete: 'off',
    value: "kevin",
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: 'please type your first name',
    label: 'First name',
    placeholder: 'First name',
    required: true,
    type: 'text',
    onChange: (e) => {
      console.log(e.target.value)
    },
    styleOverrides: {
      root: {
        color: 'purple',
        fontSize: '14px',
      },
      label: {
        color: 'red',
        fontSize: '30px',
      },
      input: {
        color: 'green',
        fontSize: '20px',
      }
    },
    textOverrides: {
      label: 'first name (override)'
    },
    useWebComponent: true
  },
};


export const useMUIComponentDefault: Story = {
  args: {
    name: 'first-name',
    id: 'first-name',
    autoComplete: 'off',
    value: "kevin",
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: 'please type your first name',
    label: 'First name',
    placeholder: 'First name',
    required: true,
    type: 'text',
    onChange: (e) => {
      console.log(e.target.value)
    },
    useWebComponent: false
  },
};

export const useMUIComponentOverride: Story = {
  args: {
    name: 'first-name',
    id: 'first-name',
    autoComplete: 'off',
    value: "kevin",
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: 'please type your first name',
    label: 'First name',
    placeholder: 'First name',
    required: true,
    type: 'text',
    onChange: (e) => {
      console.log(e.target.value)
    },
    styleOverrides: {
      root: {
        color: 'purple',
        fontSize: '14px',
      },
      label: {
        color: 'red',
        fontSize: '30px',
      },
      input: {
        color: 'green',
        fontSize: '20px',
      }
    },
    textOverrides: {
      label: 'first name (override)'
    },
    useWebComponent: false
  },
};
