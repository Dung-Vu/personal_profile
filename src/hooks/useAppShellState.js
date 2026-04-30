import { useCallback, useEffect, useState } from "react";
import { useAccentTheme } from "./useAccentTheme";

const modes = ["story", "systems"];
const densities = ["comfort", "compact"];
const motionProfiles = ["full", "balanced", "calm"];

function useStoredEnum(key, fallback, allowedValues) {
    const [value, setValue] = useState(fallback);

    useEffect(() => {
        const stored = window.localStorage.getItem(key);
        if (allowedValues.includes(stored)) {
            setValue(stored);
        }
    }, [allowedValues, key]);

    useEffect(() => {
        window.localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}

export function useAppShellState() {
    const { theme, setTheme } = useAccentTheme();
    const [mode, setMode] = useStoredEnum(
        "signal-profile-mode",
        "story",
        modes,
    );
    const [density, setDensity] = useStoredEnum(
        "signal-profile-density",
        "comfort",
        densities,
    );
    const [motionProfile, setMotionProfile] = useStoredEnum(
        "signal-profile-motion-profile",
        "full",
        motionProfiles,
    );
    const [presentationMode, setPresentationMode] = useState(false);
    const [commandOpen, setCommandOpen] = useState(false);

    const motionEnabled = motionProfile !== "calm";

    const setMotionEnabled = useCallback(
        (nextValue) => {
            setMotionProfile((current) => {
                const currentEnabled = current !== "calm";
                const resolved =
                    typeof nextValue === "function"
                        ? nextValue(currentEnabled)
                        : nextValue;

                if (resolved) {
                    return current === "calm" ? "balanced" : current;
                }

                return "calm";
            });
        },
        [setMotionProfile],
    );

    const cycleMode = useCallback(() => {
        setMode(
            (current) => modes[(modes.indexOf(current) + 1) % modes.length],
        );
    }, [setMode]);

    const cycleDensity = useCallback(() => {
        setDensity(
            (current) =>
                densities[(densities.indexOf(current) + 1) % densities.length],
        );
    }, [setDensity]);

    const cycleMotionProfile = useCallback(() => {
        setMotionProfile(
            (current) =>
                motionProfiles[
                    (motionProfiles.indexOf(current) + 1) %
                        motionProfiles.length
                ],
        );
    }, [setMotionProfile]);

    const togglePresentationMode = useCallback(() => {
        setPresentationMode((current) => !current);
    }, []);

    return {
        theme,
        setTheme,
        mode,
        setMode,
        cycleMode,
        density,
        setDensity,
        cycleDensity,
        motionProfile,
        setMotionProfile,
        cycleMotionProfile,
        motionEnabled,
        setMotionEnabled,
        presentationMode,
        setPresentationMode,
        togglePresentationMode,
        commandOpen,
        setCommandOpen,
    };
}
