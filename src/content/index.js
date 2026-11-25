// Bilingual VI/EN content resolver (pure Node-safe ESM — safe for SSR, prerender, sitemap, and browser).
import * as viSite from "./site.js";
import * as enSite from "./en/site.js";
import * as viProjects from "./projects.js";
import * as enProjects from "./en/projects.js";
import * as viStory from "./story.js";
import * as enStory from "./en/story.js";
import * as viClips from "./clips.js";
import * as enClips from "./en/clips.js";
import * as viAbout from "./about.js";
import * as enAbout from "./en/about.js";
import * as viTrust from "./trust.js";
import * as enTrust from "./en/trust.js";

const pick = (locale, vi, en) => (locale === "en" ? en : vi);

export function getSiteContent(locale = "vi") {
    const m = pick(locale, viSite, enSite);
    return {
        site: m.site,
        cta: m.cta,
        nav: m.nav,
        stats: m.stats,
        heroChips: m.heroChips,
        brief: m.brief,
        briefMailto: m.briefMailto,
        ui: m.ui,
    };
}

export function getProjectsContent(locale = "vi") {
    const m = pick(locale, viProjects, enProjects);
    return {
        categories: m.categories,
        projects: m.projects,
        extras: m.extras,
        bento: m.bento,
        getProject: m.getProject,
        getNextProject: m.getNextProject,
    };
}

export function getStoryContent(locale = "vi") {
    const m = pick(locale, viStory, enStory);
    return {
        storyIntro: m.storyIntro,
        chapters: m.chapters,
        fragments: m.fragments,
        fragmentLayout: m.fragmentLayout,
        chaosCount: m.chaosCount,
        readNotes: m.readNotes,
        buildLegend: m.buildLegend,
        aiSystems: m.aiSystems,
        steps: m.steps,
        agents: m.agents,
        hubSteps: m.hubSteps,
        agentLog: m.agentLog,
        jumpLabel: m.jumpLabel,
        storyLabels: m.storyLabels,
    };
}

export function getClipsContent(locale = "vi") {
    const m = pick(locale, viClips, enClips);
    return {
        clipNote: m.clipNote,
        replayLabel: m.replayLabel,
        proofNote: m.proofNote,
        baLabels: m.baLabels,
        clips: m.clips,
    };
}

export function getAboutContent(locale = "vi") {
    const m = pick(locale, viAbout, enAbout);
    return {
        about: m.about,
    };
}

export function getTrustContent(locale = "vi") {
    const m = pick(locale, viTrust, enTrust);
    return {
        promise: m.promise,
        collab: m.collab,
        safety: m.safety,
        faq: m.faq,
        testimonials: m.testimonials,
    };
}
