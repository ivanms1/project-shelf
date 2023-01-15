import { LANG_LOCALE_STORAGE_KEY, LOCALES } from 'const';
import isWindowPresent from './isWindowPresent';

export function getCurrentLocale() {
  if (isWindowPresent()) {
    const locale = localStorage.getItem(LANG_LOCALE_STORAGE_KEY);
    if (locale) {
      return locale;
    }

    if (
      navigator.languages &&
      navigator.languages.length &&
      LOCALES.map((l) => l.code).includes(navigator.languages[0])
    ) {
      return navigator.languages[0];
    }
  }
  return 'en';
}

export function setCurrentLocale(locale: string) {
  if (isWindowPresent()) {
    localStorage.setItem(LANG_LOCALE_STORAGE_KEY, locale);
  }
}
