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


const generateTints = (
  color: string
): readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] => {
  let prefix = color.slice(0, 1);
  let hex = color.slice(1);
  let rgb: number[] = [];
  for (let i = 0; i < 3; i++) {
    let decimal = parseInt(hex.slice(i * 2, (i + 1) * 2), 16); // convert hexadecimal to decimal
    rgb.push(decimal);
  }

  let tints = [];

  for (let i = 0; i < 10; i++) {
    let tint: number[] = rgb.map((val) => {
      let new_val = Math.floor(val + (255 - val) * (i * 0.1)); // increase brightness by 10%
      return new_val > 255 ? 255 : new_val; // make sure new value isn't over 255
    });
    let tintHex: string = tint
      .map((val) => {
        let hex = val.toString(16); // convert decimal to hexadecimal
        return hex.length === 1 ? "0" + hex : hex; // ensure two digits
      })
      .join("");
    tints.unshift(`${prefix}${tintHex}`); // prepend to get reverse order
  }

  return tints as unknown as readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
};


const getTheme = (styleGuideData: StyleGuide[]) => {
  try {
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

export { getTheme, generateTints };
