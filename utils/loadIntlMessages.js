export default async function loadI18nMessages({ locale, defaultLocale }) {
  // Ignorer la valeur de locale et utiliser directement "en"
  locale = "en";

  // Always return an empty object, no matter the locale
  return {};
}
