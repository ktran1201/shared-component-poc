import {useEffect, useState} from 'react';

const appTheme = {
  color: {
    primary: 'green',
    secondary: 'orange',
  }
}

export const useTheme = () => {
  // set application theme
  const [theme, setTheme] = useState(appTheme);

  // fetch customer overrides and set it to theme
  // useEffect(() => {
  //   setTheme({
  //     ...theme,
  //     color: {
  //       primary: 'blue',
  //       secondary: 'red',
  //     }
  //   });
  // }, []);

  return theme;
};

