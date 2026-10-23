const SCROLL_FACTOR = 0.3;

export function initializeParallax(reducedMotion) {
  const images = document.querySelectorAll('.parallax-image');
  let animationFrame = 0;

  function updateParallax() {
    animationFrame = 0;
    images.forEach(image => {
      if (reducedMotion.matches) {
        image.style.transform = 'none';
        return;
      }
      const container = image.parentElement.getBoundingClientRect();
      const maximumShift = Math.max(0, (image.offsetHeight - container.height) / 2);
      const offset = Math.max(-maximumShift, Math.min(maximumShift, -container.top * SCROLL_FACTOR));
      image.style.transform = `translateY(${offset}px)`;
    });
  }

  function requestParallaxUpdate() {
    if (!animationFrame) animationFrame = requestAnimationFrame(updateParallax);
  }
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  window.addEventListener('resize', requestParallaxUpdate);
  reducedMotion.addEventListener('change', requestParallaxUpdate);
  requestParallaxUpdate();
}
