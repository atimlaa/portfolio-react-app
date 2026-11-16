// Tiny consent store. This site currently sets NO tracking or advertising
// cookies, so the only thing stored is the visitor's own choice.
//
// If you ever add analytics, load it only when hasConsent() is true, e.g.:
//   if (hasConsent()) loadAnalytics();
//   onConsentChange((value) => value === "accepted" && loadAnalytics());

const KEY = "cookie-consent"; // "accepted" | "essential"
const EVENT = "cookie-consent-change";
const OPEN_EVENT = "cookie-consent-open";

export const getConsent = () => {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const setConsent = (value) => {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked — the banner will simply show again next visit */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
};

export const hasConsent = () => getConsent() === "accepted";

export const onConsentChange = (fn) => {
  const handler = (e) => fn(e.detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
};

// Lets the footer's "Cookie settings" button reopen the banner
export const openConsentBanner = () => window.dispatchEvent(new Event(OPEN_EVENT));
export const onOpenConsentBanner = (fn) => {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
};
