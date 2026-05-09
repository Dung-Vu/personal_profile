export const routes = [
    {
        path: "/",
        label: "Home",
        title: "Web apps",
        priority: "core",
    },
    {
        path: "/about",
        label: "About",
        title: "Work style",
        priority: "core",
    },
    {
        path: "/work",
        label: "Work",
        title: "Case study",
        priority: "core",
    },
    {
        path: "/stack",
        label: "Stack",
        title: "Capabilities",
        priority: "secondary",
    },
    {
        path: "/workflow",
        label: "Workflow",
        title: "Delivery loop",
        priority: "secondary",
    },
    {
        path: "/contact",
        label: "Contact",
        title: "Project brief",
        priority: "core",
    },
    {
        path: "/lab",
        label: "Lab",
        title: "Archive Concept",
        priority: "archive",
    },
];

export const routePaths = routes.map((route) => route.path);

export function normalizePath(pathname) {
    if (!pathname || pathname === "/") return "/";
    const normalized = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

    if (normalized.startsWith("/work/")) {
        return normalized;
    }

    return routePaths.includes(normalized) ? normalized : "/404";
}
