import { translations } from './translations.js';

const LANGUAGE_STORAGE_KEY = 'afrisav-language';
const DEFAULT_LANGUAGE = 'en';

export function translate(key, language) {
  return translations[key]?.[language] ?? translations[key]?.[DEFAULT_LANGUAGE] ?? '';
}

export function initializeLanguage(onLanguageChange) {
  const textElements = document.querySelectorAll('[data-i18n]');
  const imageElements = document.querySelectorAll('[data-alt-en]');
  const languageButtons = document.querySelectorAll('[data-lang]');
  const description = document.querySelector('meta[name="description"]');
  const labelledElements = document.querySelectorAll('[data-aria-label-i18n]');
  const metadataElements = document.querySelectorAll('[data-meta-i18n]');
  const languageStatus = document.getElementById('language-status');

  function setLanguage(requestedLanguage) {
    const language = requestedLanguage === 'de' ? 'de' : DEFAULT_LANGUAGE;
    document.documentElement.lang = language;
    textElements.forEach(element => {
      const text = translate(element.dataset.i18n, language);
      if (element.textContent !== text) element.textContent = text;
    });
    imageElements.forEach(image => {
      const alternateText = image.getAttribute(`data-alt-${language}`);
      if (image.alt !== alternateText) image.alt = alternateText;
    });
    languageButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });
    document.title = translate('document.title', language);
    description.content = translate('document.description', language);
    labelledElements.forEach(element => {
      element.setAttribute('aria-label', translate(element.dataset.ariaLabelI18n, language));
    });
    metadataElements.forEach(element => {
      element.content = translate(element.dataset.metaI18n, language);
    });
    onLanguageChange(language);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Private browsing or blocked storage must not prevent language switching.
    }
  }

  languageButtons.forEach(button => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.lang);
      languageStatus.textContent = translate('language.changed', document.documentElement.lang);
    });
  });
  let preferredLanguage = DEFAULT_LANGUAGE;
  try {
    preferredLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;
  } catch {
    // The statically rendered English content remains the default.
  }
  setLanguage(preferredLanguage);
}
