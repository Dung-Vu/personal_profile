import { ArrowUpRight } from "lucide-react";
import { navigateTo } from "../../hooks/useRoutePath";
import { routes } from "../../routes/routes";
import { Chapter } from "../sections/Chapter";

const routeDescriptions = {
    "/": "Cinematic intro gọn hơn, dẫn người xem vào Work hoặc Contact thay vì ép đọc toàn bộ OS cũ.",
    "/about":
        "Phần con người, mindset và cách làm việc được tách riêng khỏi shell thử nghiệm.",
    "/work":
        "Project evidence, case cards và case detail routes nằm ở đây, không còn lặp trong Lab.",
    "/stack":
        "Năng lực kỹ thuật và toolchain được gom thành trang riêng dễ scan hơn.",
    "/workflow":
        "Quy trình từ brief tới runnable slice nằm ở route riêng, tránh làm Lab quá dài.",
    "/contact":
        "Email, brief template và work-fit cards chuyển về trang contact sạch hơn.",
};

const keptSignals = [
    "Mode / density / motion controls",
    "Command panel",
    "Presentation reel",
    "Signal canvas",
    "Custom cursor",
];

export function LabArchiveSection({ scrambleEnabled, sectionMeta }) {
    const routeCards = routes
        .filter(({ priority }) => priority !== "archive")
        .map((route) => ({
            ...route,
            detail: routeDescriptions[route.path] ?? route.title,
        }));

    return (
        <Chapter
            id="archive"
            chapter={sectionMeta?.displayChapter ?? "01"}
            label="content archive map"
            summary="Lab không còn đóng vai trò portfolio chính. Nó chỉ giữ lại lớp OS/motion thử nghiệm và trỏ người xem sang các route đã tách."
            title="Nội dung bị lặp đã được chuyển ra ngoài Lab."
            scene="workflow"
            modeOrder={sectionMeta?.modeOrder}
            modeTone={sectionMeta?.modeTone}
            presentation={sectionMeta?.modePresentation}
            scrambleEnabled={scrambleEnabled}
        >
            <div className="lab-archive-layout">
                <div
                    className="lab-archive-routes reveal"
                    aria-label="Current site route map"
                >
                    {routeCards.map((route) => (
                        <article className="lab-archive-route" key={route.path}>
                            <span>{route.label}</span>
                            <strong>{route.title}</strong>
                            <p>{route.detail}</p>
                            <button
                                type="button"
                                className="lab-route-link"
                                data-magnetic
                                onClick={() => navigateTo(route.path)}
                            >
                                Open route
                                <ArrowUpRight aria-hidden="true" />
                            </button>
                        </article>
                    ))}
                </div>

                <aside
                    className="lab-archive-preserve reveal"
                    aria-label="Lab-only features"
                >
                    <span>kept in lab</span>
                    <strong>Những thứ còn độc quyền của OS cũ</strong>
                    <p>
                        Đây là phần nên giữ để xem vibe thử nghiệm, không dùng
                        để kể lại profile, case study hay quy trình làm việc.
                    </p>
                    <div className="tech-list">
                        {keptSignals.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </aside>
            </div>
        </Chapter>
    );
}
