const shellModeCopy = {
    story: {
        label: "guided narrative",
        paceLabel: "pace / cinematic",
        reelDurationMs: 5200,
        detail: "Mindset, selected cases và brief cuối được dẫn như một câu chuyện liền mạch để người xem đọc fit và output trong cùng một nhịp.",
        footerLabel: "story close",
        footerLead:
            "Story mode ưu tiên flow mượt: từ cách nghĩ, sang output, rồi chốt bằng một đầu vào đủ tốt để bắt đầu làm việc.",
        footerDetail:
            "Hợp với người muốn đánh giá tổng thể trước khi đi sâu vào từng module kỹ thuật.",
        footerActions: [
            {
                label: "Replay route",
                hint: "start from home",
                kind: "reel",
                target: "home",
            },
            {
                label: "Copy story",
                hint: "share narrative summary",
                kind: "copy-summary",
                toast: "Đã copy story summary",
            },
        ],
    },
    systems: {
        label: "systems walkthrough",
        paceLabel: "pace / analytical",
        reelDurationMs: 5600,
        detail: "Route này đưa capability matrix, workflow pipeline và project surfaces lên trước để người xem hiểu logic vận hành trước outcome.",
        footerLabel: "systems close",
        footerLead:
            "Systems mode giữ nhịp đọc nghiêng về state, constraints, data shape và các vòng verify runtime.",
        footerDetail:
            "Phù hợp khi cần nhìn ra cấu trúc giải quyết vấn đề, không chỉ phần visual cuối cùng.",
        footerActions: [
            {
                label: "Open systems",
                hint: "capability matrix",
                kind: "jump",
                target: "stack",
            },
            {
                label: "Copy systems",
                hint: "share systems summary",
                kind: "copy-summary",
                toast: "Đã copy systems summary",
            },
        ],
    },
    cases: {
        label: "case theater route",
        paceLabel: "pace / showcase",
        reelDurationMs: 4700,
        detail: "Case theater là sân khấu chính, còn workflow và capability đóng vai trò chứng cứ để giải thích vì sao outcomes phía trước đứng vững.",
        footerLabel: "cases close",
        footerLead:
            "Cases mode nén phần nền và đẩy evidence lên foreground để người xem đọc năng lực FE qua case nhanh hơn.",
        footerDetail:
            "Hợp với flow review portfolio, showcase hoặc khi cần đánh giá output trong vài phút đầu.",
        footerActions: [
            {
                label: "Open theater",
                hint: "case evidence",
                kind: "jump",
                target: "projects",
            },
            {
                label: "Copy cases",
                hint: "share case summary",
                kind: "copy-summary",
                toast: "Đã copy case summary",
            },
        ],
    },
    recruiter: {
        label: "hiring summary route",
        paceLabel: "pace / rapid scan",
        reelDurationMs: 3800,
        detail: "Mode này ưu tiên highlights, contact và delivery signals để một recruiter hoặc hiring manager có thể đọc fit nhanh với ít scroll thừa nhất.",
        footerLabel: "recruiter close",
        footerLead:
            "Recruiter mode tối giản tín hiệu: featured work trước, hiring node sớm, phần còn lại chỉ giữ những gì giúp đánh giá fit rõ hơn.",
        footerDetail:
            "Phù hợp cho vòng scan nhanh khi cần nhìn năng lực, ownership và cách cộng tác chỉ sau một lượt đọc ngắn.",
        footerActions: [
            {
                label: "Copy profile",
                hint: "fast recruiter summary",
                kind: "copy-summary",
                toast: "Đã copy recruiter summary",
            },
            {
                label: "Open hire node",
                hint: "collaboration brief",
                kind: "jump",
                target: "contact",
            },
        ],
    },
};

export function getShellModeCopy(mode = "story") {
    return shellModeCopy[mode] ?? shellModeCopy.story;
}
