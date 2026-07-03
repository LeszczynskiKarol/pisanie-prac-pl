// Rejestr typów prac — źródło prawdy dla gridu na home, nawigacji i stopki.
// Treść merytoryczna każdej podstrony żyje w src/pages/<slug>.astro.

import type { IconName } from "../icons/set";

export interface WorkType {
  slug: string;
  /** Nazwa w mianowniku — grid, nawigacja */
  name: string;
  /** Fraza w miejscowniku — "pomoc w pisaniu <czego>" */
  genitive: string;
  icon: IconName;
  /** 1-2 zdania na kartę w gridzie */
  teaser: string;
}

export const workTypes: WorkType[] = [
  {
    slug: "praca-licencjacka",
    name: "Praca licencjacka",
    genitive: "pracy licencjackiej",
    icon: "book-open",
    teaser:
      "Od tematu i konspektu po redakcję przed obroną. Wzorcowe rozdziały pokazuję jako punkt odniesienia, nie gotowiec.",
  },
  {
    slug: "praca-magisterska",
    name: "Praca magisterska",
    genitive: "pracy magisterskiej",
    icon: "grad-cap",
    teaser:
      "Metodologia, badania własne, analiza wyników. Pomagam zbudować pracę, którą obronisz ze zrozumieniem.",
  },
  {
    slug: "praca-inzynierska",
    name: "Praca inżynierska",
    genitive: "pracy inżynierskiej",
    icon: "compass-plan",
    teaser:
      "Część projektowa, dokumentacja techniczna, opis wdrożenia. Konsultuję też stronę praktyczną projektu.",
  },
  {
    slug: "praca-doktorska",
    name: "Praca doktorska",
    genitive: "rozprawy doktorskiej",
    icon: "layers-chapters",
    teaser:
      "Wsparcie redakcyjne i metodologiczne przy rozprawie: struktura, spójność wywodu, przygotowanie do recenzji.",
  },
  {
    slug: "praca-zaliczeniowa",
    name: "Praca zaliczeniowa",
    genitive: "pracy zaliczeniowej",
    icon: "draft-check",
    teaser:
      "Eseje semestralne, projekty, case study. Krótkie terminy, konkretne wytyczne prowadzącego.",
  },
  {
    slug: "esej",
    name: "Esej akademicki",
    genitive: "eseju",
    icon: "quote-marks",
    teaser:
      "Teza, argumentacja, styl. Pokazuję na wzorcowych przykładach, czym esej różni się od streszczenia.",
  },
  {
    slug: "referat",
    name: "Referat i prezentacja",
    genitive: "referatu",
    icon: "chat-guidance",
    teaser:
      "Referat na zajęcia albo wystąpienie z prezentacją. Struktura pod mówienie, nie pod czytanie z kartki.",
  },
  {
    slug: "artykul-naukowy",
    name: "Artykuł naukowy",
    genitive: "artykułu naukowego",
    icon: "magnifier-text",
    teaser:
      "IMRaD, przegląd literatury, odpowiedzi na recenzje. Dla doktorantów i autorów pierwszych publikacji.",
  },
];
