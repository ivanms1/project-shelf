const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'ne', 'ko', 'es'],
  },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/public/locales",
};
