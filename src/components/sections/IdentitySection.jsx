import { getSectionModeCopy } from "../../content/sectionModeCopy";
import { SignalMap } from "../../features/signal-map/SignalMap";
import { Chapter } from "./Chapter";

export function IdentitySection({
    mode,
    profile,
    scrambleEnabled,
    sectionMeta,
}) {
    const copy = getSectionModeCopy("identity", mode);

    return (
        <Chapter
            id="identity"
            chapter={sectionMeta?.displayChapter ?? "01"}
            label={copy.label ?? "identity module"}
            summary={copy.summary}
            title={
                copy.title ?? "Làm web không chỉ để đẹp, mà để chạy đúng việc."
            }
            scene="identity"
            modeOrder={sectionMeta?.modeOrder}
            modeTone={sectionMeta?.modeTone}
            presentation={sectionMeta?.modePresentation}
            scrambleEnabled={scrambleEnabled}
        >
            <div className="identity-layout">
                <div className="portrait-panel parallax-image reveal">
                    <img
                        src="/assets/signal-about-dossier.webp"
                        alt="Developer workspace dossier with interface sketches and signal maps."
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="portrait-overlay">
                        <span>VD / 2001</span>
                        <strong>developer signal detected</strong>
                    </div>
                </div>
                <SignalMap profile={profile} />
            </div>
        </Chapter>
    );
}
