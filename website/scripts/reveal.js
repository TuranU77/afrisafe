export function initializeReveals(reducedMotion) {
  const elements = document.querySelectorAll('.reveal');
  let observer;

  function configureReveals() {
    observer?.disconnect();
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      document.documentElement.classList.remove('motion-enabled');
      elements.forEach(element => element.classList.add('visible'));
      return;
    }
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -80px 0px' });
    document.documentElement.classList.add('motion-enabled');
    elements.forEach(element => {
      if (!element.classList.contains('visible')) observer.observe(element);
    });
  }

  reducedMotion.addEventListener('change', configureReveals);
  configureReveals();
}
