// Tiny consent store. This site currently sets NO tracking or advertising
// cookies, so the only thing stored is the visitor's own choice.
//
// If you ever add analytics, load it only when hasConsent() is true, e.g.:
//   if (hasConsent()) loadAnalytics();
//   onConsentChange((value) => value === "accepted" && loadAnalytics());
// …and add it to NON_ESSENTIAL_SERVICES so the banner asks first-time
// visitors, and list it on the Privacy and Cookie pages.

// Services that need the visitor's consent before they load.
// Empty = nothing to ask about, so the banner only opens on request.
export const NON_ESSENTIAL_SERVICES = [];

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

// True only when there is something to consent to and no choice is saved yet
export const needsConsent = () => NON_ESSENTIAL_SERVICES.length > 0 && !getConsent();

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
