// Central per-project site config.
// Components and layouts read from here — DON'T sprinkle hardcoded values
// across the codebase.

export const siteConfig = {
  // Brand
  name: "pisanie-prac.pl",
  shortName: "pomoc w pisaniu",
  url: "https://www.pisanie-prac.pl",
  locale: "pl_PL",
  lang: "pl",

  // Legal
  // adminName / adminAddress / adminNip used in /polityka-prywatnosci
  legal: {
    adminName: "ADMIN_NAME_PLACEHOLDER",
    adminAddress: "ADMIN_ADDRESS_PLACEHOLDER",
    adminNip: "NIP_PLACEHOLDER",
    adminEmail: "kontakt@pisanie-prac.pl",
  },

  // Feature flags
  features: {
    // GA4 ID — auto-provisioned 2026-07-03 (properties/543982696, konto "Leszczu").
    ga4: "G-JTGRXZ2ZW9" as string | null,

    // Contact form — Lambda + SES + presign (playbook 08).
    contactForm: true,

    // Załączniki formularza — default ON (wytyczne promotora, konspekt, fragment pracy).
    contactFormAttachments: true,

    // Leadgen — umowa zawierana poza stroną, brak sprzedaży online.
    hasShop: false,

    // Blog — default OFF.
    hasBlog: false,
  },

  // Contact (footer / structured data)
  contact: {
    email: "kontakt@pisanie-prac.pl",
    phone: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
