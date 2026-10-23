const ANIMATION_DURATION = 400;

export function initializeAccordions(reducedMotion) {
  document.querySelectorAll('.faq-item').forEach(item => {
    const summary = item.querySelector('summary');
    let animation;
    let isClosing = false;

    summary.addEventListener('click', event => {
      if (reducedMotion.matches || !item.animate) return;
      event.preventDefault();
      const startHeight = item.getBoundingClientRect().height;
      const shouldOpen = !item.open || isClosing;
      animation?.cancel();
      isClosing = !shouldOpen;
      item.open = true;
      item.style.height = '';
      const endHeight = shouldOpen
        ? item.getBoundingClientRect().height
        : summary.getBoundingClientRect().height + 1;
      item.style.overflow = 'hidden';
      animation = item.animate(
        { height: [`${startHeight}px`, `${endHeight}px`] },
        { duration: ANIMATION_DURATION, easing: 'ease' },
      );
      animation.onfinish = () => {
        item.open = shouldOpen;
        item.style.overflow = '';
        animation = null;
        isClosing = false;
      };
    });
  });
}
