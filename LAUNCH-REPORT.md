# LAUNCH REPORT — pisanie-prac.pl

**Data launchu**: 2026-07-03
**Mode**: autonomous (brief od Karola: pomoc w pisaniu + wzorcowe prace jako inspiracja + nacisk na legalność)

---

## Infrastruktura

| Zasób | Wartość |
|---|---|
| Route53 hosted zone | `Z01190112VE0UH2PMR8SF` |
| NS w Aftermarket | przepięte 2026-07-03 (ns-842/1444/304/2037 awsdns) |
| ACM cert (us-east-1) | `arn:aws:acm:...:certificate/8e62a39c-e5cf-4ca3-a913-5dc9377c723a` (www + naked, ISSUED) |
| CloudFront www | `E1E5GRJ78JL25M` (d1ssw9ggxp1e4n.cloudfront.net) + trailing-slash function |
| CloudFront naked | `EVKMGAVP02KKU` (301 → www) |
| S3 | `www.pisanie-prac.pl` (site) + `pisanie-prac.pl` (redirect) + `pisanie-prac-attachments` (30 dni lifecycle) |
| API Gateway | `https://ry4iv493eh.execute-api.eu-central-1.amazonaws.com` (POST /contact, /presign) |
| Lambdy | `pisanie-prac-contact`, `pisanie-prac-presign` (nodejs20.x) |
| SES | domena zweryfikowana, DKIM + SPF + DMARC + MAIL FROM (mail.pisanie-prac.pl), **production access ✓** |
| MX | mx1/mx2.aftermarket.pl (forwarding skrzynki) |
| GA4 | property `properties/543982696` (konto Leszczu), stream `G-JTGRXZ2ZW9`, Consent Mode v2 |

## Architektura treści

- Home: hero + stats + jak pomagam (6 kart) + typy prac (8 kart) + proces + legalność + FAQ (JSON-LD) + formularz
- 8 podstron typów prac (Service + BreadcrumbList + FAQPage JSON-LD, ~800–1000 słów każda, unikalne sekcje + FAQ)
- `/jak-pomagam/` — zakres usług + "czego nie robię" + zasady płatności
- `/legalnosc/` — art. 272 KK, JSA, analogie (korepetycje/wzory pism), FAQ
- `/kontakt/` — formularz z załącznikami (typ pracy select + termin oddania)
- `/polityka-prywatnosci/` (noindex, poza sitemap)
- Rama narracyjna (wymóg Karola): POMAGAM w pisaniu; wzorcowe prace = materiał poglądowy/inspiracja; legalność eksponowana (LegalNote na każdej podstronie typu pracy, stopka z dopiskiem).

## Verified (2026-07-03)

- [x] Build: 14 stron, sitemap-0.xml = 12 URL (bez noindex)
- [x] `gtag('consent', 'default'` literal w dist (nie template-literal bug)
- [x] G-JTGRXZ2ZW9 w dist, cookie banner aktywny; gtag.js lazy po window.load
- [x] Title home z frazą kluczową (nie goły brand)
- [x] robots.txt: Allow / + Disallow /_assets/ + sitemap-index
- [x] SES production access enabled
- [x] https://pisanie-prac.pl → 301 → https://www.pisanie-prac.pl (przez CF IP; lokalny router miał jeszcze cache parkingu)
- [x] http→https 301 na obu hostach
- [x] 404 zwraca 404 (nie 403), Content-Type text/html
- [x] `_commit.txt` = HEAD (naprawiony bug: Actions kasował manifest — fix w workflow + szablonie generatora)
- [x] Brand assets 200: favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.jpg
- [x] Cache headers: HTML `max-age=0, must-revalidate`, assets/fonts `immutable`
- [x] Nagłówki bezpieczeństwa: HSTS + X-Content-Type-Options (SecurityHeadersPolicy)
- [x] Formularz smoke: POST /contact → `{"success":true}` (SES wysłał), POST /presign → presigned URL OK
- [x] GitHub Actions: zielony deploy przez OIDC (pierwszy run padł — wystartował przed `gh secret set`; rerun OK)
- [x] Lighthouse (lokalnie, przez CF IP): SEO 100, A11y 97, Best 100, CLS ~0; perf desktop 92
- [x] GSC: sc-domain:pisanie-prac.pl VERIFIED (DNS_TXT, token zmergowany z SPF w jednym RRsecie TXT — NIE USUWAĆ)
- [x] GSC: sitemap-index.xml submitted (isPending — normalny stan, crawl 1-7 dni); stary wpis parkingowy usunięty
- [x] GSC: delegate ownership → owners zawiera karolleszczynskikorektor@gmail.com (może i tak wymagać dodania property w UI — 10 s, TXT już jest)
- [x] seo_panel (prod, panel VPS): Domain `www.pisanie-prac.pl` (EDU/SATELLITE/CONTENT_SITE, id cmc007589fc3249bb0cd87b5) + DomainIntegration GOOGLE_ANALYTICS properties/543982696
- [ ] PSI datacenter mobile/desktop — patrz sekcja PageSpeed niżej
- [ ] Manual (Karol, po 1 kliknięciu): OG preview (opengraph.xyz), Rich Results Test (search.google.com/test/rich-results)

## Performance — decyzje techniczne

- Fonty self-hosted: variable woff2 subset łacina+PL (`public/fonts/`, fontTools) — Inter 61 KB + Source Serif 123 KB zamiast 350 KB z fonts.gstatic (2 originy mniej). `font-display: optional` + preload + metric-adjusted fallbacki (CLS 0.13 → 0).
- gtag.js (149 KB) ładowany po `window.load` + idle — poza oknem pre-LCP; consent defaults inline natychmiast (bez zmiany wzorca raw-JS).
- Uwaga pomiarowa: headless Lighthouse na lokalnej maszynie zawyżał FCP/LCP (observed paint po window.load — artefakt headless); realne czasy sieci: HTML 240 ms, komplet zasobów < 700 ms.

## PageSpeed Insights (datacenter)

| | Performance | SEO | A11y | Best practices |
|---|---|---|---|---|
| Mobile | PSI_MOBILE_PENDING | | | |
| Desktop | PSI_DESKTOP_PENDING | | | |

(Klucz PSI miał wyczerpaną kwotę dzienną w dniu launchu — wynik dopisany po resecie kwoty.)

## ⚠️ Do uzupełnienia przez Karola

- [ ] **Skrzynka `kontakt@pisanie-prac.pl` na Aftermarket** + forwarding na prywatny adres — bez niej maile z formularza nie dotrą (SES wysyła, ale MX/skrzynka odbiorcza musi istnieć w panelu Aftermarket).
- [ ] **NIP / nazwa działalności / adres** — placeholdery `ADMIN_NAME_PLACEHOLDER`, `ADMIN_ADDRESS_PLACEHOLDER`, `NIP_PLACEHOLDER` w `src/config/site.ts` (używane w polityce prywatności). Stopka celowo bez danych firmy do czasu uzupełnienia.
- [ ] **Opinie klientów** — sekcja nieistniejąca; dostarcz 3–5 prawdziwych cytatów + zgody, dorobimy sekcję.
- [ ] **GA4 ↔ GSC link** (API nie istnieje, tylko UI): https://analytics.google.com/ → property „pisanie-prac.pl" (543982696) → Admin → Product links → Search Console links → Link → `sc-domain:pisanie-prac.pl` → web stream → Submit.
- [ ] **GSC w Twoim panelu**: jeśli property nie widać na https://search.google.com/search-console → Add property → Domain → `pisanie-prac.pl` — weryfikacja natychmiastowa (TXT już w Route53). **TXT `google-site-verification=HNvEWMbS…` MUSI ZOSTAĆ na zawsze** (re-check ownership co ~7 dni).
- [ ] (Opcjonalnie) przykładowe fragmenty wzorcowych opracowań (PDF) do wysyłki zainteresowanym mailem.

## Decyzje (skrót z brief.md)

Głos 1. os. l.poj. ("pomagam"); bez cennika (wycena indywidualna); bez bloga (default OFF); bez sklepu/regulaminu (leadgen); 8 typów prac; editorial design (Source Serif 4 + Inter, indygo #4338CA + bursztyn #B45309); własny zestaw ikon (stalówka/waga/biret/cudzysłów...).
