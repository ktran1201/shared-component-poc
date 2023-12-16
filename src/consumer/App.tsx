import React from "react";
import {TextInput} from "../components/public/TextInput";
import {useTheme, AppThemeContext} from "./useTheme";

interface AppProps {
  useWebComponent?: boolean;
  usePrimaryColor?: boolean;
}

const App: React.FC<AppProps> = ({useWebComponent, usePrimaryColor}) => {
  const theme = useTheme();

  return (
    <AppThemeContext.Provider value={theme}>
      <TextInput
        name='first-name'
        id='first-name'
        autoComplete = 'off'
        value = "kevin"
        disabled ={false}
        error={false}
        fullWidth={false}
        helperText='please type your first name'
        label = 'First name'
        placeholder = 'First name'
        required={true}
        type='text'
        color={usePrimaryColor ? "primary" : "secondary"}
        useWebComponent={useWebComponent}
      />
    </AppThemeContext.Provider>
  )
};

export default App;
