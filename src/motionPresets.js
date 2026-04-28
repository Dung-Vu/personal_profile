export const sceneColors = {
  boot: "#5ee7ff",
  identity: "#b8ff6a",
  stack: "#ffca5f",
  projects: "#ff4d67",
  workflow: "#9b7cff",
  contact: "#f7f4ea",
};

export const revealPreset = {
  from: { opacity: 0.72, y: 20 },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.72,
    ease: "power3.out",
    scrollTrigger: {
      start: "top 94%",
      once: true,
    },
  },
};

export const sectionGateTiming = {
  scrollDelay: 180,
};

export const cardHoverPreset = {
  y: -8,
  duration: 0.22,
  ease: "power2.out",
};

export const projectModulePreset = {
  from: { opacity: 0.78, y: 32, scale: 0.985 },
  to: {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.86,
    ease: "power3.out",
    scrollTrigger: {
      start: "top 92%",
      once: true,
    },
  },
};
