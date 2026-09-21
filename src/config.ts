// Brand + site configuration. One file drives identity, SEO base and monetization switches.
export const site = {
  name: 'DevCrate',
  tagline: 'Fast, free developer tools that run entirely in your browser.',
  description:
    'DevCrate is a collection of free developer tools: JSON formatter and validator, Base64 encoder/decoder, JWT decoder, regex tester, hash generator and more. Everything runs locally in your browser - your data never leaves your device.',
  // Temporary Pages URL until the final domain is confirmed.
  url: 'https://devcrate-9ii.pages.dev',
  locale: 'en',
  // Visual identity (drives CSS custom properties in Base.astro).
  theme: {
    accent: '#6366f1', // indigo
    accentStrong: '#4f46e5',
    bg: '#0f1115',
    bgSoft: '#171a21',
    text: '#e6e8ee',
    textMuted: '#9aa1b2',
    radius: '10px',
    fontStack: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
    bodyFont: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
  },
  // Analytics: fill in when the property exists. Nothing is injected while null.
  analytics: { gaId: null as string | null, gscVerification: null as string | null },
  // Ads: slots render only when a real client id is configured. Never show fake ads.
  ads: { enabled: false, client: null as string | null },
  contactEmail: 'hello@devcrate.dev' // placeholder until final domain email exists
};
export type Site = typeof site;
