import { useEffect, useState } from "react";

const useFonts = (fonts: string[]) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFonts = () => {
    const head = document.getElementsByTagName("head")[0];

    if (fonts.length === 0) {
      return;
    }

    fonts.forEach((font) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font;
      head.appendChild(link);
    });
    setIsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return { isFontsLoaded: isLoaded };
};

export { useFonts };
