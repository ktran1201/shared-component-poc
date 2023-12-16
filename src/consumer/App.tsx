import React from "react";
import {TextInput} from "../components/public/TextInput";
import {appTheme, AppThemeContext} from "./theme";

const App = () => {
  return (
    <AppThemeContext.Provider value={appTheme}>
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
        color="primary"
      />
    </AppThemeContext.Provider>
  )
};

export default App;
