const principles = [
    {
        id: "clarity",
        value: "Primary",
        title: "Clarity first",
        detail: "Trạng thái, hierarchy và hành động phải đọc ra được ngay từ lần chạm đầu tiên.",
    },
    {
        id: "systems",
        value: "System",
        title: "System thinking",
        detail: "UI không đứng một mình; nó phải phản ánh được data shape, constraints và shell behavior.",
    },
    {
        id: "runtime",
        value: "Runtime",
        title: "Runtime verification",
        detail: "Mỗi flow quan trọng đều phải kiểm bằng browser, data thật và fallback state rõ ràng.",
    },
    {
        id: "delivery",
        value: "Delivery",
        title: "Execution loops",
        detail: "Tập trung vào các lát cắt chạy được sớm, sửa nhanh, validate nhanh và giữ context lâu.",
    },
];

const timeline = [
    ["2001", "Origin"],
    ["First builds", "Web foundations"],
    ["Internal tools", "Operations mindset"],
    ["AI workflows", "Current focus"],
];

export function SignalMap({ profile }) {
    return (
        <div className="signal-map-shell reveal">
            <p className="signal-map-copy">{profile.about}</p>

            <div
                className="signal-principles"
                aria-label="Operating principles map"
            >
                {principles.map((item) => (
                    <article
                        key={item.id}
                        className="signal-principle"
                        data-cursor="inspect"
                    >
                        <div className="signal-principle-head">
                            <span>{item.title}</span>
                            <strong>{item.value}</strong>
                        </div>
                        <div
                            className="signal-principle-bar"
                            aria-hidden="true"
                        >
                            <i />
                        </div>
                        <p>{item.detail}</p>
                    </article>
                ))}
            </div>

            <div className="signal-map-footer">
                <div
                    className="signal-focus-strip"
                    aria-label="Current focus strip"
                >
                    <span>focus / {profile.focus}</span>
                    <span>base / {profile.location}</span>
                    <span>signal / product-fe</span>
                </div>

                <div className="signal-timeline" aria-label="Short timeline">
                    {timeline.map(([year, label]) => (
                        <div key={year}>
                            <strong>{year}</strong>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
