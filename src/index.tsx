import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ZoiqThemeProvider, useZoiqTheme } from "./context/ZoiqThemeProvider";

export { ZoiqThemeProvider, useZoiqTheme };

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
