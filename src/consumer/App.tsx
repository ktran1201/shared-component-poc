import React from "react";
import {TextInput} from "../components/public/TextInput";
import {useTheme} from "./useTheme";
import {Color, ShareComponentsThemeContext, Size} from '../theme'

interface AppProps {
  color?: Color;
  fontSize?: Size;
}

const App: React.FC<AppProps> = ({color, fontSize}) => {
  const theme = useTheme();

  return (
    <ShareComponentsThemeContext.Provider value={theme}>
      <TextInput
        name='first-name'
        id='first-name'
        autoComplete = 'off'
        value = "Upstart"
        disabled ={false}
        error={false}
        fullWidth={false}
        helperText='please type your first name'
        label = 'First name'
        placeholder = 'First name'
        required={true}
        type='text'
        color={color}
        fontSize={fontSize}
      />
    </ShareComponentsThemeContext.Provider>
  )
};

export default App;
