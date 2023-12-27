import {useEffect, useState} from 'react';

const appTheme = {
  colors: {
    primary: 'green',
    secondary: 'orange',
  },
  fontSizes: {
    xs: '10px',
    sm: '15px',
    md: '20px',
    lg: '25px',
    xl: '30px',
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

