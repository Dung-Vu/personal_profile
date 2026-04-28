export const isNearViewport = (node) =>
  Boolean(node) && node.getBoundingClientRect().top < window.innerHeight * 0.96;
