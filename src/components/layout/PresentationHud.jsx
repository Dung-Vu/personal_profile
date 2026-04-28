import { ArrowRight, Pause, Play } from "lucide-react";
import { getShellModeCopy } from "../../content/shellModeCopy";

function formatLabel(value) {
    if (!value) return "Unknown";
    return value[0].toUpperCase() + value.slice(1);
}

export function PresentationHud({
    activeRecord,
    jumpTo,
    mode,
    nextRecord,
    presentationMode,
    reelDurationMs,
    reelProgress,
    reelSecondsLeft,
    routeRecords,
    sectionCount,
    setPresentationMode,
}) {
    const copy = getShellModeCopy(mode);
    const activeIndex = routeRecords.findIndex(
        ({ id }) => id === activeRecord?.id,
    );
    const routeTimelineProgress =
        routeRecords.length > 1
            ? Math.max(
                  0,
                  Math.min(
                      1,
                      (Math.max(activeIndex, 0) + reelProgress) /
                          (routeRecords.length - 1),
                  ),
              )
            : 1;

    return (
        <aside
            className="presentation-hud"
            aria-label="Guided route status"
            data-mode={mode}
        >
            <div className="presentation-hud-topline">
                <span>{copy.label}</span>
                <strong>
                    {presentationMode ? "reel / running" : "reel / standby"}
                </strong>
            </div>

            <div
                className="presentation-hud-meter"
                aria-label="Guided reel timing"
            >
                <div
                    className="presentation-hud-meter-track"
                    aria-hidden="true"
                >
                    <i style={{ transform: `scaleX(${reelProgress})` }} />
                </div>
                <div className="presentation-hud-meter-copy">
                    <span>{copy.paceLabel ?? "pace / guided"}</span>
                    <strong>
                        {presentationMode
                            ? `${reelSecondsLeft}s to next hop`
                            : `${Math.round(reelDurationMs / 1000)}s reel pace`}
                    </strong>
                </div>
            </div>

            <div className="presentation-hud-copy">
                <p>{copy.detail}</p>
            </div>

            <div
                className="presentation-hud-route"
                aria-label="Guided route chapters"
            >
                <div className="presentation-route-line" aria-hidden="true">
                    <i
                        style={{
                            transform: `scaleX(${routeTimelineProgress})`,
                        }}
                    />
                </div>
                {routeRecords.map((record, index) => {
                    const state =
                        record.id === activeRecord?.id
                            ? "current"
                            : record.id === nextRecord?.id
                              ? "next"
                              : index < activeIndex
                                ? "explored"
                                : "upcoming";
                    const progressFill =
                        state === "explored"
                            ? 1
                            : state === "current"
                              ? presentationMode
                                  ? Math.max(reelProgress, 0.12)
                                  : 0.34
                              : state === "next"
                                ? 0.16
                                : 0.04;

                    return (
                        <button
                            type="button"
                            key={record.id}
                            className="presentation-route-chip"
                            data-magnetic
                            data-state={state}
                            title={
                                record.shellHint ??
                                formatLabel(record.railLabel ?? record.label)
                            }
                            onClick={() => jumpTo(`#${record.id}`)}
                        >
                            <i
                                className="presentation-route-progress"
                                aria-hidden="true"
                                style={{ transform: `scaleX(${progressFill})` }}
                            />
                            <span>{record.displayChapter}</span>
                            <strong>
                                {formatLabel(record.railLabel ?? record.label)}
                            </strong>
                        </button>
                    );
                })}
            </div>

            <div
                className="presentation-hud-grid"
                aria-label="Current guided route state"
            >
                <article>
                    <span>current</span>
                    <strong>
                        {activeRecord?.displayChapter ?? "00"} /{" "}
                        {formatLabel(
                            activeRecord?.railLabel ?? activeRecord?.label,
                        )}
                    </strong>
                    <small>{activeRecord?.shellHint ?? copy.detail}</small>
                </article>
                <article>
                    <span>next</span>
                    <strong>
                        {nextRecord?.displayChapter ?? "00"} /{" "}
                        {formatLabel(
                            nextRecord?.railLabel ?? nextRecord?.label,
                        )}
                    </strong>
                    <small>{nextRecord?.shellHint ?? copy.detail}</small>
                </article>
                <article>
                    <span>route</span>
                    <strong>
                        {(activeRecord
                            ? Number(activeRecord.displayChapter)
                            : 0) + 1}
                        {" / "}
                        {sectionCount}
                    </strong>
                    <small>{copy.footerDetail}</small>
                </article>
            </div>

            <div className="presentation-hud-actions">
                <button
                    type="button"
                    data-magnetic
                    onClick={() => setPresentationMode((current) => !current)}
                >
                    {presentationMode ? (
                        <Pause aria-hidden="true" />
                    ) : (
                        <Play aria-hidden="true" />
                    )}
                    <span>
                        {presentationMode ? "Pause reel" : "Start reel"}
                    </span>
                </button>
                <button
                    type="button"
                    data-magnetic
                    onClick={() => jumpTo(`#${nextRecord?.id ?? "home"}`)}
                >
                    <ArrowRight aria-hidden="true" />
                    <span>Jump next</span>
                </button>
            </div>
        </aside>
    );
}
