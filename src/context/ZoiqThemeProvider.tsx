import { StyleGuide, StyleGuideValues } from "../interfaces/index";
import { ThemeConfig } from "antd";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getTheme } from "../utils";
import axios from "axios";

// create a basic theme context
const ThemeContext = createContext<{
  token: ThemeConfig["token"];
  styleGuideValues: StyleGuideValues;
}>({
  token: {},
  styleGuideValues: {} as StyleGuideValues,
});

export const useZoiqTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ZoiqThemeProvider");
  }
  return context;
};

const BASE_THEME_URL =
  "https://zoiqassetsbucket200938-staging.s3.us-east-1.amazonaws.com/public/PROJECT_DATA";

const fetchTheme = async (API_KEY: string) => {
  // use axios
  const data = await axios.get(`${BASE_THEME_URL}/${API_KEY}/STYLE_GUIDE`);
  return data.data;
};

const ZoiqThemeProvider = ({
  children,
  API_KEY,
}: PropsWithChildren & {
  API_KEY: string;
}) => {
  const [theme, setTheme] = useState({});
  const [styleGuideValues, setStyleGuideValues] = useState<StyleGuideValues>(
    {} as StyleGuideValues
  );

  useEffect(() => {
    fetchTheme(API_KEY).then((data) => {
      if (data && data.length > 0) {
        const { token, styleGuideValues } = getTheme(data);
        setTheme(token);
        setStyleGuideValues(styleGuideValues);
      }
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        token: theme,
        styleGuideValues,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ZoiqThemeProvider;