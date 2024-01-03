import { createContext } from "react";

export type Color = "primary" | "secondary";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface ShareComponentsThemeContextType {
  colors?: {
    primary?: string;
    secondary?: string;
  };
  fontSizes?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

export const ShareComponentsThemeContext =
  createContext<ShareComponentsThemeContextType>({});
