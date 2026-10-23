import { initializeLanguage } from './i18n.js';
import { initializeNavigation } from './navigation.js';
import { initializeReveals } from './reveal.js';
import { initializeParallax } from './parallax.js';
import { initializeAccordions } from './accordion.js';

const navigation = initializeNavigation();
initializeLanguage(language => navigation.updateLanguage(language));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
initializeReveals(reducedMotion);
initializeParallax(reducedMotion);
initializeAccordions(reducedMotion);
