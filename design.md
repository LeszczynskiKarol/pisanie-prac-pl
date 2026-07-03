# Design system — pisanie-prac.pl

**Preset**: editorial (edukacja / treść ekspercka)
**Mood**: akademicki, ale współczesny — dużo whitespace, serif w nagłówkach, spokojne indygo z ciepłym bursztynowym kontrapunktem. Strona ma wyglądać jak gabinet dobrego promotora, nie jak anonimowy serwis ghostwriterski.

## Typografia

- Serif (display/H1–H2): **Source Serif 4** (400, 600)
- Sans (body/UI): **Inter** (400, 500, 700)
- Skala: 1.333 (perfect fourth — editorial)
- Base: 17px desktop / 16px mobile, line-height 1.7 body

## Paleta — light

- bg: #FAF9F6 (ciepły off-white, papier)
- bg-elevated: #FFFFFF
- bg-subtle: #F1EFE9
- text: #1C1B22 (ink z nutą fioletu)
- text-muted: #57534E
- border: #E5E2DA
- accent (primary): #4338CA (indygo — CTA, linki, IconBadge)
- accent-hover: #3730A3
- accent-secondary: #B45309 (bursztyn — gradienty, detale, stat highlight)

## Paleta — dark

- bg: #0E0D13 (granatowy atrament, nie #000)
- bg-elevated: #1A1925
- bg-subtle: #232131
- text: #F0EEE9
- text-muted: #A8A29E
- border: #2C2A3A
- accent: #818CF8 (jaśniejsze indygo — czytelne na ciemnym)
- accent-hover: #A5B4FC
- accent-secondary: #D97706

## Ikony — autorski zestaw (grid 24×24, stroke 1.75, currentColor)

Tematyczne, projektowane pod branżę pisania akademickiego:
- `nib` (stalówka — logo/brand), `book-open` (typy prac), `compass-plan` (plan pracy),
- `magnifier-text` (research/źródła), `quote-marks` (cytowanie/przypisy), `scale` (legalność),
- `chat-guidance` (konsultacje), `draft-check` (redakcja/korekta), `shield-check` (antyplagiat/JSA),
- `clock-deadline` (terminy), `grad-cap` (obrona), `layers-chapters` (rozdziały)
- - prymitywy UI ze scaffolda (arrow-right, menu, x, check, mail, phone, chevron-down...)

## Komponenty kluczowe

- **Hero**: HeroIllustration wariant custom — kompozycja "kartka + stalówka + linie tekstu" w SVG, gradient indygo→bursztyn na akcencie; duża typografia serif z `text-gradient-accent` na jednym słowie.
- **CTA**: przycisk indygo, tekst biały, rounded-md; hover ciemniejszy o odcień, bez scale.
- **Cards** (typy prac): bg-elevated, border, rounded-xl, ikona w IconBadge, hover unosi border-color do akcentu. Grid 4×2 (desktop) / 2 kolumny (tablet) / 1 (mobile).
- **Sekcja legalność**: wyróżniona karta z `card-accent-top` + ikona `scale`; ton spokojny, cytat z przepisu.
- **Proces**: numery 01–04 w serif, accent-secondary, BackgroundDecor dots.
- **Logo**: monogram — stalówka (nib) w zaokrąglonym kwadracie z gradientem indygo→bursztyn + wordmark "pisanie-prac.pl" w serif.

## Rytm tła (home)

hero `bg` + BackgroundDecor mesh (jedyny mesh na stronie) → stats `bg-elevated` → jak pomagam `bg` → typy prac `bg-subtle` → proces `bg` + dots → legalność `bg-elevated` → FAQ `bg` → kontakt `bg-subtle` → footer `bg-elevated`.

## Co celowo pomijam

- Zdjęcia stockowe (studenci przy laptopach = slop) — tylko SVG ilustracje własne.
- Parallax, lottie, animowane countery.
- Glow/blur poza hero (hard rule Karola), underline poza prose.
