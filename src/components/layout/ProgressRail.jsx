import { useMemo } from "react";
import { getSectionRecords } from "../../lib/sections";

export function ProgressRail({ active, jumpTo, mode, reelProgress }) {
    const sectionRecords = useMemo(() => getSectionRecords(mode), [mode]);
    const activeIndex = sectionRecords.findIndex(({ id }) => id === active);

    return (
        <aside className="progress-rail" aria-label="Scene map">
            {sectionRecords.map(
                (
                    { id, displayChapter, railLabel, modeTone, shellHint },
                    index,
                ) => {
                    const state =
                        active === id
                            ? "current"
                            : activeIndex > -1 && index < activeIndex
                              ? "explored"
                              : index === activeIndex + 1
                                ? "next"
                                : "upcoming";
                    const fill =
                        state === "explored"
                            ? 1
                            : state === "current"
                              ? Math.max(reelProgress ?? 0, 0.16)
                              : state === "next"
                                ? 0.18
                                : 0.04;

                    return (
                        <a
                            className={[
                                active === id ? "active" : "",
                                activeIndex > -1 && index < activeIndex
                                    ? "explored"
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            href={`#${id}`}
                            key={id}
                            data-label={railLabel}
                            data-mode-tone={modeTone}
                            data-route-state={state}
                            data-magnetic
                            aria-current={
                                active === id ? "location" : undefined
                            }
                            aria-label={`Jump to ${railLabel} section: ${shellHint ?? railLabel}`}
                            title={shellHint ?? railLabel}
                            onClick={(event) => {
                                event.preventDefault();
                                jumpTo(`#${id}`);
                            }}
                        >
                            <i
                                className="progress-rail-fill"
                                aria-hidden="true"
                                style={{ transform: `scaleY(${fill})` }}
                            />
                            <span>{displayChapter}</span>
                        </a>
                    );
                },
            )}
        </aside>
    );
}
