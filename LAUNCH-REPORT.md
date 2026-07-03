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

## Verified

- [x] Build: 14 stron, sitemap-0.xml = 12 URL (bez noindex)
- [x] `gtag('consent', 'default'` literal w dist (nie template-literal bug)
- [x] G-JTGRXZ2ZW9 w dist, cookie banner aktywny
- [x] Title home z frazą kluczową (nie goły brand)
- [x] robots.txt: Allow / + Disallow /_assets/ + sitemap-index
- [x] SES production access enabled
- [ ] PSI mobile ≥90 / desktop ≥95 — (uzupełnione po deploy, patrz niżej)
- [ ] Naked → www redirect — (po deploy)
- [ ] Smoke test formularza — (po deploy)

## ⚠️ Do uzupełnienia przez Karola

- [ ] **Skrzynka `kontakt@pisanie-prac.pl` na Aftermarket** + forwarding na prywatny adres — bez niej maile z formularza nie dotrą (SES wysyła, ale MX/skrzynka odbiorcza musi istnieć w panelu Aftermarket).
- [ ] **NIP / nazwa działalności / adres** — placeholdery `ADMIN_NAME_PLACEHOLDER`, `ADMIN_ADDRESS_PLACEHOLDER`, `NIP_PLACEHOLDER` w `src/config/site.ts` (używane w polityce prywatności). Stopka celowo bez danych firmy do czasu uzupełnienia.
- [ ] **Opinie klientów** — sekcja nieistniejąca; dostarcz 3–5 prawdziwych cytatów + zgody, dorobimy sekcję.
- [ ] **GA4 ↔ GSC link** — API nie istnieje; ręcznie w GA4 Admin → Product links → Search Console links (property 543982696).
- [ ] (Opcjonalnie) przykładowe fragmenty wzorcowych opracowań (PDF) do wysyłki zainteresowanym mailem.

## Decyzje (skrót z brief.md)

Głos 1. os. l.poj. ("pomagam"); bez cennika (wycena indywidualna); bez bloga (default OFF); bez sklepu/regulaminu (leadgen); 8 typów prac; editorial design (Source Serif 4 + Inter, indygo #4338CA + bursztyn #B45309); własny zestaw ikon (stalówka/waga/biret/cudzysłów...).
