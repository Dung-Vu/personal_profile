import { useCallback, useEffect, useState } from "react";
import { themePackIds } from "../content/themePacks";

const storageKey = "signal-profile-accent";

export function useAccentTheme() {
    const [theme, setTheme] = useState("signal");

    useEffect(() => {
        const stored = window.localStorage.getItem(storageKey);
        if (themePackIds.includes(stored)) setTheme(stored);
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem(storageKey, theme);
    }, [theme]);

    const cycleTheme = useCallback(() => {
        setTheme(
            (current) =>
                themePackIds[
                    (themePackIds.indexOf(current) + 1) % themePackIds.length
                ],
        );
    }, []);

    return { theme, setTheme, cycleTheme };
}
