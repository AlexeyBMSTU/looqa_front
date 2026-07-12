export const customScrollTo = (top: number = 0) => {
  return window.scrollTo({
    top,
    left: 0,
    behavior: 'smooth',
  });
};
