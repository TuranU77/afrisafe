import { translate } from './i18n.js';

export function initializeNavigation() {
  const navigation = document.getElementById('nav');
  const menu = document.getElementById('navLinks');
  const menuButton = navigation.querySelector('.hamburger');
  const mobileViewport = window.matchMedia('(max-width:1100px)');
  let language = 'en';

  function updateMenuLabel() {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-label', translate(isOpen ? 'navigation.closeMenu' : 'navigation.openMenu', language));
  }

  function setMenuOpen(requestedOpen, focusFirstLink = false) {
    const isOpen = mobileViewport.matches && requestedOpen;
    const isHidden = mobileViewport.matches && !isOpen;
    menu.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(isHidden));
    menu.inert = isHidden;
    updateMenuLabel();
    if (isOpen && focusFirstLink) menu.querySelector('a').focus();
  }

  const closeMenu = () => setMenuOpen(false);
  menuButton.addEventListener('click', () => setMenuOpen(!menu.classList.contains('open'), true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  navigation.addEventListener('focusout', event => {
    if (!navigation.contains(event.relatedTarget)) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target)) {
      const focusWasInMenu = menu.contains(document.activeElement);
      closeMenu();
      if (mobileViewport.matches && focusWasInMenu) menuButton.focus();
    }
  });
  mobileViewport.addEventListener('change', () => {
    const focusWasInMenu = menu.contains(document.activeElement);
    const buttonWasFocused = document.activeElement === menuButton;
    closeMenu();
    if (mobileViewport.matches && focusWasInMenu) menuButton.focus();
    if (!mobileViewport.matches && buttonWasFocused) navigation.querySelector('.nav-brand').focus();
  });

  // Keep native fragment scrolling, then place keyboard focus at the destination.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (menu.contains(link)) closeMenu();
      const target = document.getElementById(link.hash.slice(1));
      if (target?.hasAttribute('tabindex')) {
        requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    });
  });

  function updateScrollAppearance() {
    navigation.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateScrollAppearance, { passive: true });
  updateScrollAppearance();
  closeMenu();

  return {
    updateLanguage(nextLanguage) {
      language = nextLanguage;
      updateMenuLabel();
    },
  };
}
