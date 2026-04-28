import { ScrambleText } from "../ui/ScrambleText";

export function Chapter({
    id,
    chapter,
    label,
    summary,
    title,
    scene,
    modeOrder,
    modeTone,
    presentation = "full",
    scrambleEnabled,
    children,
}) {
    return (
        <section
            id={id}
            className={`${id}-section chapter`}
            data-chapter={chapter}
            data-scene={scene}
            data-mode-order={modeOrder}
            data-mode-tone={modeTone}
            data-mode-presentation={presentation}
        >
            <div className="chapter-heading reveal">
                <ScrambleText
                    as="p"
                    className="system-label"
                    enabled={scrambleEnabled}
                >
                    {label}
                </ScrambleText>
                <ScrambleText as="h2" enabled={scrambleEnabled}>
                    {title}
                </ScrambleText>
                {summary ? <p className="section-copy">{summary}</p> : null}
            </div>
            {children}
        </section>
    );
}
