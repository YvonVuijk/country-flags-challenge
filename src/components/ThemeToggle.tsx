import React, { useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import createPersistedState from "use-persisted-state";

import Button from '@material-ui/core/Button';

const DARK_CLASS = "dark";
const useIsDarkState = createPersistedState("isDark");

const ThemeToggle: React.FC = () => {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useIsDarkState(systemPrefersDark);

  const toggleDark = useCallback(() => {
    setIsDark((e) => !e);
  }, [setIsDark]);

  useEffect(() => {
    if (isDark)
      document.documentElement.classList.add(DARK_CLASS);
    else
      document.documentElement.classList.remove(DARK_CLASS);
  }, [isDark]);

  return (
    <>
      <Button variant='contained' onClick={toggleDark}>
        {isDark ? "Light" : "Dark"} Mode
      </Button>
    </>
  );
};

export default ThemeToggle;