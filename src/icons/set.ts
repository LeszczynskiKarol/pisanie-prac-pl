// ─────────────────────────────────────────────────────────────────────────
// WŁASNY ZESTAW IKON — pisanie-prac.pl. Ręcznie rysowany, ZERO lucide/heroicons.
// Grid 24×24, stroke = currentColor, jedna grubość kreski (wrapper daje 1.75).
// Motyw: warsztat pisania akademickiego — stalówka, papier, źródła, obrona.
// ─────────────────────────────────────────────────────────────────────────

export const icons = {
  // ── Prymitywy UI (neutralne) ──────────────────────────────────────────
  "arrow-right": `<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>`,
  "arrow-left": `<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>`,
  "chevron-down": `<path d="m6 9 6 6 6-6"/>`,
  "chevron-right": `<path d="m9 6 6 6-6 6"/>`,
  "x": `<path d="M6 6 18 18"/><path d="M18 6 6 18"/>`,
  "menu": `<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>`,
  "check": `<path d="m5 12 4 4 10-10"/>`,
  "external-link": `<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>`,
  "phone": `<path d="M5 4h3l2 5-2 1a10 10 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`,
  "map-pin": `<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`,
  "mail": `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>`,

  // ── Ikony tematyczne — warsztat pisania akademickiego ─────────────────
  // Stalówka — znak marki (logo, brand accents)
  "nib": `<path d="M8 3h8l3 9-7 9-7-9z"/><circle cx="12" cy="10" r="1.3"/><path d="M12 11.3V16"/>`,
  // Otwarta książka — typy prac, materiały
  "book-open": `<path d="M3 5.5c2.6-1.3 5.4-1.3 8 0V19c-2.6-1.3-5.4-1.3-8 0z"/><path d="M21 5.5c-2.6-1.3-5.4-1.3-8 0V19c2.6-1.3 5.4-1.3 8 0z"/>`,
  // Cyrkiel — plan pracy, metodologia
  "compass-plan": `<circle cx="12" cy="5" r="1.7"/><path d="M11.2 6.5 6 20"/><path d="M12.8 6.5 18 20"/><path d="M7.6 15.8a8.6 8.6 0 0 0 8.8 0"/>`,
  // Lupa nad tekstem — research, źródła
  "magnifier-text": `<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path d="M7.8 9h5.4"/><path d="M7.8 12.2h4"/>`,
  // Cudzysłowy — cytowanie, przypisy, styl
  "quote-marks": `<path d="M6.3 16.5c-.8-3.7.5-6.8 3.4-8.7"/><circle cx="6.6" cy="16.8" r="1.2"/><path d="M14.3 16.5c-.8-3.7.5-6.8 3.4-8.7"/><circle cx="14.6" cy="16.8" r="1.2"/>`,
  // Waga — legalność
  "scale": `<path d="M12 5v15"/><path d="M8.5 20h7"/><path d="M5.5 7.5h13"/><path d="m5.5 7.5-2.4 5a2.7 2.7 0 0 0 4.8 0z"/><path d="m18.5 7.5-2.4 5a2.7 2.7 0 0 0 4.8 0z"/>`,
  // Dymek z liniami — konsultacje, prowadzenie
  "chat-guidance": `<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4z"/><path d="M8 8.5h8"/><path d="M8 12h5"/>`,
  // Dokument z ptaszkiem — redakcja, korekta
  "draft-check": `<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="m9 14 2.2 2.2 4.3-5.2"/>`,
  // Tarcza z ptaszkiem — JSA / antyplagiat / bezpieczeństwo
  "shield-check": `<path d="M12 3 5 5.8v5.4c0 4.3 3 7.4 7 8.8 4-1.4 7-4.5 7-8.8V5.8z"/><path d="m8.8 11.8 2.3 2.4 4.1-4.8"/>`,
  // Zegar — terminy
  "clock": `<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>`,
  // Biret — obrona, dyplom
  "grad-cap": `<path d="m12 4 10 4.5-10 4.5L2 8.5z"/><path d="M6.5 10.7v4.3c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.3"/><path d="M22 8.5V14"/>`,
  // Stos kartek z liniami — rozdziały, struktura pracy
  "layers-chapters": `<rect x="4.5" y="3.5" width="12.5" height="15.5" rx="1.5"/><path d="M19.5 7.5V19a2 2 0 0 1-2 2H8"/><path d="M8 8h5.5"/><path d="M8 11.5h5.5"/><path d="M8 15h3.5"/>`,

  // ── Formularz / stany (używane przez ContactForm) ─────────────────────
  "check-circle": `<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>`,
  "upload-cloud": `<path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17 18"/><path d="M12 12v7"/><path d="m9 15 3-3 3 3"/>`,
  "loader": `<path d="M21 12a9 9 0 1 1-6.2-8.5"/>`,
} as const;

export type IconName = keyof typeof icons;
