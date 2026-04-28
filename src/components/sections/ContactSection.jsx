import { getSectionModeCopy } from "../../content/sectionModeCopy";
import { IntakeConsole } from "../../features/intake-console/IntakeConsole";
import { ScrambleText } from "../ui/ScrambleText";

export function ContactSection({
    copyEmail,
    mode,
    profile,
    scrambleEnabled,
    sectionMeta,
}) {
    const copy = getSectionModeCopy("contact", mode);
    const briefSubject = encodeURIComponent(
        "Project brief - cần trao đổi website/dashboard",
    );
    const briefBody = encodeURIComponent(
        "Chào Dũng,\n\nMình muốn trao đổi về:\n- Bài toán hiện tại:\n- Mục tiêu mong muốn:\n- Timeline / deadline:\n- Link tham khảo nếu có:\n\nCảm ơn bạn.",
    );

    return (
        <section
            id="contact"
            className="chapter contact-section"
            data-chapter={sectionMeta?.displayChapter ?? "05"}
            data-scene="contact"
            data-mode-order={sectionMeta?.modeOrder}
            data-mode-tone={sectionMeta?.modeTone}
            data-mode-presentation={sectionMeta?.modePresentation}
        >
            <div className="contact-shell">
                <div className="contact-copy reveal">
                    <ScrambleText
                        as="p"
                        className="system-label"
                        enabled={scrambleEnabled}
                    >
                        {copy.label ?? "contact node"}
                    </ScrambleText>
                    <ScrambleText as="h2" enabled={scrambleEnabled}>
                        {copy.title ?? "Từ brief sang command path rõ ràng."}
                    </ScrambleText>
                    <p className="section-copy">
                        {copy.summary ?? profile.contactText}
                    </p>
                    <div
                        className="contact-proof-grid"
                        aria-label="Engagement fit"
                    >
                        {(copy.proof ?? []).map((item) => (
                            <article key={item.label}>
                                <span>{item.label}</span>
                                <strong>{item.title}</strong>
                                <p>{item.detail}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <IntakeConsole
                    briefHref={`mailto:${profile.email}?subject=${briefSubject}&body=${briefBody}`}
                    copyEmail={copyEmail}
                    profile={profile}
                />
            </div>
        </section>
    );
}
