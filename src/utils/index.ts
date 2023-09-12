import { ThemeConfig } from "antd";
import { StyleGuide, StyleGuideValues } from "../interfaces";

const DEFAULT_COLORS = {
  // primary colors
  primary: "#FCBF34",
  primaryDark: "#D89C26",
  primaryLight: "#FDD366",
  secondary: "#c62368",

  // Dark colors
  dark: "#0d1117",
  darker: "#17141d",
  darkVariant: "#3c4449",

  // gray colors
  gray: "#717F92",
  grayVariant: "rgba(255, 255, 255, 0.48)",
  secondaryBlack: "#5d6680",
  lightGray: "rgb(22, 27, 34)",
  secondaryWhite: "#C4C4C5",
};

const getTheme = (styleGuideData: StyleGuide[]) => {
  try {
    console.log(
      "🚀 ~ file: index.ts:25 ~ getTheme ~ styleGuideData:",
      styleGuideData
    );
    const styleGuide: any = {};

    styleGuideData.forEach((d) => {
      styleGuide[d.name] = d.value;
    });

    const styleGuideValues: StyleGuideValues = styleGuide;

    const token: ThemeConfig["token"] = {
      colorPrimary: styleGuideValues.primary ?? DEFAULT_COLORS.primary,
      colorBgLayout: styleGuideValues.darkest ?? DEFAULT_COLORS.dark,
      borderRadius: 16,
      fontFamily: styleGuideValues?.fontFamilyPrimary ?? "Poppins, sans-serif",
      fontSize: Number(styleGuideValues?.fontSizeBody ?? 16),
      fontSizeHeading1: Number(styleGuideValues?.fontSizeBanner ?? 48),
      fontSizeHeading2: Number(styleGuideValues?.fontSizeTitle ?? 32),
      fontSizeHeading3: Number(styleGuideValues?.fontSizeSubtitle ?? 24),
      fontSizeHeading4: Number(styleGuideValues?.fontSizeBody ?? 16),
      lineHeightHeading1: Number(styleGuideValues?.lineHeightBanner ?? 1.2),
      lineHeightHeading2: Number(styleGuideValues?.lineHeightTitle ?? 1.2),
      lineHeightHeading3: Number(styleGuideValues?.lineHeightSubtitle ?? 1.2),
      lineHeightHeading4: Number(styleGuideValues?.lineHeightBody ?? 1.2),
      colorBorder: styleGuideValues.dark,
      colorLink: styleGuideValues.primary ?? DEFAULT_COLORS.primary,
    };

    document.documentElement.style.setProperty(
      "--font-primary",
      styleGuideValues.fontFamilyPrimary ?? "Poppins, sans-serif"
    );
    document.documentElement.style.setProperty(
      "--font-secondary",
      styleGuideValues.fontFamilySecondary ?? "Architects Daughter, cursive"
    );

    return {
      token,
      styleGuideValues,
    };
  } catch (error) {
    console.error(error);
  }
};

export { getTheme };
