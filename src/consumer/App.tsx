import React, { ChangeEvent, useState } from "react";
import { TextInput } from "../components/public/TextInput";
import { useTheme } from "./useTheme";
import { Color, ShareComponentsThemeContext, Size } from "../theme";

export interface AppProps {
  color?: Color;
  fontSize?: Size;
}

const App: React.FC<AppProps> = ({ color, fontSize }) => {
  const theme = useTheme();
  const [val, setVal] = useState("");
  return (
    <ShareComponentsThemeContext.Provider value={theme}>
      <TextInput
        name="first-name"
        dataTestId="login-form"
        autoComplete="off"
        value={val}
        disabled={false}
        error="something went wrong"
        helperText="please type your first name"
        label="First name"
        placeholder="First name"
        isRequired={true}
        type="text"
        color={color}
        fontSize={fontSize}
        minLength={3}
        maxLength={10}
        toUpperCase={true}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setVal(event.target.value);
        }}
      />
    </ShareComponentsThemeContext.Provider>
  );
};

export default App;
