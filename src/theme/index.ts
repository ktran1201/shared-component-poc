import {createContext} from "react";

export type Color = 'primary' | 'secondary';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ShareComponentsThemeContextType {
  colors: {
    primary: string;
    secondary: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}


const defaultTheme = {
  colors: {
    primary: 'green',
    secondary: 'purple'
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  }
}

export const ShareComponentsThemeContext = createContext<ShareComponentsThemeContextType>(defaultTheme);
