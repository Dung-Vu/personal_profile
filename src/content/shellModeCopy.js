const shellModeCopy = {
    story: {
        modeName: "Archive",
        label: "lab archive",
        paceLabel: "pace / archive",
        reelDurationMs: 4200,
        detail: "Lab giữ lại Signal OS cũ như một bản lưu tương tác. Nội dung portfolio chính đã chuyển sang sitemap mới.",
        footerLabel: "archive close",
        footerLead:
            "Lab bây giờ là phòng thử nghiệm: shell, motion, command panel và route map.",
        footerDetail:
            "Để đọc profile thật, đi qua Home, Work, Stack, Workflow hoặc Contact thay vì đọc lại nội dung ở đây.",
        footerActions: [
            {
                label: "Replay lab",
                hint: "start from archive entry",
                kind: "reel",
                target: "home",
            },
            {
                label: "Route map",
                hint: "open moved content map",
                kind: "jump",
                target: "archive",
            },
        ],
    },
    systems: {
        modeName: "Shell",
        label: "shell controls",
        paceLabel: "pace / control",
        reelDurationMs: 4400,
        detail: "Mode này ưu tiên các điều khiển còn độc quyền của Lab: density, motion, theme, command center và canvas.",
        footerLabel: "shell close",
        footerLead:
            "Systems mode không kể lại stack; nó chỉ cho thấy cách Signal OS shell vận hành.",
        footerDetail:
            "Stack và workflow đầy đủ đã nằm ở route riêng để người xem đọc sạch hơn.",
        footerActions: [
            {
                label: "Open map",
                hint: "current route ownership",
                kind: "jump",
                target: "archive",
            },
            {
                label: "Copy shell note",
                hint: "share lab summary",
                kind: "copy-summary",
                toast: "Đã copy lab summary",
            },
        ],
    },
};

export function getShellModeCopy(mode = "story") {
    return shellModeCopy[mode] ?? shellModeCopy.story;
}
