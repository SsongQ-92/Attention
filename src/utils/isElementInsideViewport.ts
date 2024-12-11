const isElementInsideViewport = (top: number, bottom: number) => {
  let isPartiallyVisible = false;

  const viewportHeight = window.innerHeight;
  isPartiallyVisible =
    (top < 0 && bottom > 0 && bottom < viewportHeight) ||
    (top > 0 && top < viewportHeight && bottom > viewportHeight);

  return isPartiallyVisible;
};

export default isElementInsideViewport;
