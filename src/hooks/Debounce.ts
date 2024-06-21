import React, { useRef } from "react";

export function useDebounce() {
  const [tempText, setTempText] = React.useState("");
  const [debouncedText, setDebouncedText] = React.useState("");
  const renderRef = useRef(false);
  const setDebounce = React.useCallback((text: string) => {
    setTempText(text);
  }, []);

  React.useEffect(() => {
    let timeout: any;
    if (renderRef) {
      timeout = setTimeout(() => {
        setDebouncedText(tempText);
      }, 1000);
      renderRef.current = true;
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [tempText]);

  return [debouncedText, setDebounce] as const;
}
