import React from "react";
import WebTextInput from "../../private/WebTextInput";

interface TextInputProps {
  name: string;
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({name, label}) => {
  return (
    <WebTextInput
      name={name}
      label={label}
    />
  );
};

export default TextInput;
