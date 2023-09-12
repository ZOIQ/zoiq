import { ThemeConfig } from "antd";
import axios from "axios";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { StyleGuideValues } from "../interfaces/index";
import { getTheme } from "../utils";

// create a basic theme context
const ThemeContext = createContext<{
  token: ThemeConfig["token"];
  styleGuideValues: StyleGuideValues;
  isFetchingTheme: boolean;
}>({
  token: {},
  isFetchingTheme: true,
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

  const [isFetchingTheme, setIsFetchingTheme] = useState(true);

  useEffect(() => {
    setIsFetchingTheme(true);
    fetchTheme(API_KEY).then((data) => {
      console.log(data);
      if (data && data.length > 0 && Array.isArray(data)) {
        const { token, styleGuideValues } = getTheme(data);
        setTheme(token);
        setStyleGuideValues(styleGuideValues);
      }
      setIsFetchingTheme(false);
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        token: theme,
        styleGuideValues,
        isFetchingTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ZoiqThemeProvider };
