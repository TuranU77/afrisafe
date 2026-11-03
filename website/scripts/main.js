import { initializeLegalDialogs } from './legal-dialog.js?v=20261103-privacy-release';
import { initializeLanguage } from './i18n.js?v=20261103-iso-cache';
import { initializeNavigation } from './navigation.js?v=20261103-iso-cache';
import { initializeReveals } from './reveal.js';
import { initializeParallax } from './parallax.js';
import { initializeAccordions } from './accordion.js';

const navigation = initializeNavigation();
initializeLanguage(language => navigation.updateLanguage(language));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
initializeReveals(reducedMotion);
initializeParallax(reducedMotion);
initializeAccordions(reducedMotion);

initializeLegalDialogs();
