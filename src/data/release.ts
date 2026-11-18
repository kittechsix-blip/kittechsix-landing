// Launch switch for every app on the site.
//
// Every app is in PREVIEW: its links open a page on this site with screenshots
// and "Full release coming soon", never the app itself. App addresses are kept
// out of the site's code on purpose (scripts/check-no-app-urls.mjs fails the
// build if one slips back in).
//
// To launch an app: add its id and its App Store link below. Its buttons switch
// from "See the preview" to "Open" everywhere on the site. Nothing else changes.
export const RELEASED: Record<string, string> = {
  // mymedkitt: 'https://apps.apple.com/app/...',
};

export const RELEASE_BANNER = 'Full release coming soon';
export const RELEASE_SUB = 'Coming to the App Store';

/** The App Store link once an app has launched; null while it is in preview. */
export function releaseUrl(id: string): string | null {
  return Object.prototype.hasOwnProperty.call(RELEASED, id) ? RELEASED[id] : null;
}

/** The on-site preview page for an app. */
export function previewHref(id: string): string {
  return `#/projects/${id}`;
}
