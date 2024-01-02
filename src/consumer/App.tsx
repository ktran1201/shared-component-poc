import React, { ChangeEvent } from "react";
import { TextInput } from "../components/public/TextInput";
import { useTheme } from "./useTheme";
import { Color, ShareComponentsThemeContext, Size } from "../theme";

export interface AppProps {
  color?: Color;
  fontSize?: Size;
}

const App: React.FC<AppProps> = ({ color, fontSize }) => {
  const theme = useTheme();

  return (
    <ShareComponentsThemeContext.Provider value={theme}>
      <TextInput
        name="first-name"
        dataTestId="login-form"
        autoComplete="off"
        value="Upstart"
        disabled={false}
        error={false}
        helperText="please type your first name"
        label="First name"
        placeholder="First name"
        required={true}
        type="text"
        color={color}
        fontSize={fontSize}
        onChange={(val: ChangeEvent<HTMLInputElement>) => {
          console.log(val);
        }}
      />
    </ShareComponentsThemeContext.Provider>
  );
};

export default App;
