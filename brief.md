# Brief — pisanie-prac.pl

**Mode**: AUTONOMOUS (Karol dał domenę + kierunek treści: pomoc w pisaniu, wzorcowe prace jako inspiracja, nacisk na legalność)
**Data**: 2026-07-03
**Status**: draft (do przeglądu po fakcie)

---

## Cel biznesowy

Leadgen: student z konkretną pracą do napisania wysyła zapytanie przez formularz (z załącznikiem — wytyczne, konspekt, fragment). Strona pozycjonuje usługę jako **legalną pomoc edukacyjną**: konsultacje, redakcja, opracowania wzorcowe do celów poglądowych — nie "pisanie prac za kogoś".

## Audytorium

- **Typ**: B2C
- **Region**: krajowy (PL)
- **Charakterystyka**: studenci studiów licencjackich/magisterskich/inżynierskich (22–35 lat, często pracujący zaocznie), doktoranci, słuchacze studiów podyplomowych. Problem: brak czasu, brak warsztatu metodologicznego, stres przed promotorem i JSA. Motywacja: oddać dobrą pracę w terminie i rozumieć, co się oddaje.
- **Język(i)**: PL

## USP

Pomoc, która nie udaje czegoś innego: jasno opisany zakres (konsultacje metodologiczne, plan pracy, opracowania wzorcowe jako inspiracja, redakcja i korekta), jawna strona o legalności z powołaniem na art. 272 KK i regulaminy uczelni — zamiast typowej dla branży szarej strefy "dyskrecji".

## Sekcje strony / architektura

1. **Home** — hero (pomoc w pisaniu prac + CTA "Bezpłatna wycena w 24 h"), jak pomagam (4 filary), grid typów prac (linki do podstron), proces 01–04, sekcja legalność (skrót + link), FAQ, kontakt.
2. **Podstrony typów prac** (8, każda z pełną treścią ~700–1000 słów, FAQ, specyfika danego typu):
   - `/praca-licencjacka/`
   - `/praca-magisterska/`
   - `/praca-inzynierska/`
   - `/praca-doktorska/`
   - `/praca-zaliczeniowa/`
   - `/esej/`
   - `/referat/`
   - `/artykul-naukowy/`
3. `/jak-pomagam/` — zakres usług + granice (czego nie robię) + proces szczegółowo.
4. `/legalnosc/` — osobna strona: dlaczego pomoc jest legalna, co mówi prawo (art. 272 KK dotyczy poświadczenia nieprawdy — samodzielności pracy), czym jest opracowanie wzorcowe, odpowiedzialność studenta, JSA.
5. `/kontakt/` — formularz z załącznikami.
6. `/polityka-prywatnosci/` (noindex).

## Branding

- **Logo**: monogram — stylizowana stalówka/pióro w gradiencie indygo→bursztyn.
- **Preset designu**: editorial (edukacja/treść) z ciepłym akcentem.
- **Paleta**: indygo (#3730A3 / #4338CA) jako primary + bursztyn (#B45309) jako secondary; neutralne off-white/ink.
- **Typografia**: Source Serif 4 (nagłówki, klimat akademicki) + Inter (body).
- **Ton**: ekspercki, ale partnerski. Pierwsza osoba liczby pojedynczej ("pomagam", "sprawdzam", "pokazuję") — zgodnie z brzmieniem zlecenia Karola.

## Formularz kontaktowy

- **Wymagany**: tak
- **Pola**: imię, e-mail, telefon (opcja), typ pracy (select), termin oddania, treść + **załączniki (default ON)** — wytyczne promotora, konspekt, fragment pracy.
- **Skrzynka docelowa**: `kontakt@pisanie-prac.pl` (Aftermarket, forwarding — Karol założy skrzynkę)
- **MX provider**: aftermarket

## Treść

- **Źródło**: piszę od zera (playbook 06 — zero AI slop).
- **Kluczowa rama narracyjna (wymóg Karola)**: wszędzie podkreślać, że **POMAGAM w pisaniu** — nie piszę prac "do oddania". Wzorcowe prace i ich fragmenty pokazuję **w ramach inspiracji** / jako materiał poglądowy. Legalność usługi eksponowana (osobna strona + sekcja na home + notka na każdej podstronie typu pracy).
- **Język copy**: PL

## SEO

- **Główne frazy**: "pomoc w pisaniu prac", "pomoc w pisaniu pracy licencjackiej", "pomoc w pisaniu pracy magisterskiej", "pomoc w pisaniu pracy inżynierskiej", "wzory prac dyplomowych".
- **Konkurencja**: cyber-folks'owe serwisy ghostwriterskie (edu-pomoc, pogotowie-naukowe itp.) — większość unika tematu legalności; nasza strona robi z tego przewagę.

## Feature flags (siteConfig)

- [x] **ga4** → auto-provisioning (playbook 11), fallback `null`
- [x] **contactForm** → `true` (z załącznikami)
- [ ] **hasShop** → `false` (leadgen, umowa poza stroną — brak regulaminu)
- [ ] **hasBlog** → `false` (default OFF)

## Co claude założył (bo nie zapytał)

- **Głos pierwszoosobowy ("pomagam")** — Karol w zleceniu pisał "POMAGAM", "moich usług"; jednoosobowa marka eksperta brzmi wiarygodniej w tej branży niż anonimowy "zespół redaktorów".
- **8 typów prac** — pokrywa realny popyt (licencjacka/magisterska/inżynierska to 80% fraz); doktorska i artykuł naukowy dodane dla długiego ogona; pominąłem "prezentacje maturalne" (nie istnieją od 2015) i "biznesplany" (inna intencja).
- **Bez cennika** — wycena indywidualna przez formularz; ceny w tej branży zależą od kierunku/terminu, sztywny cennik generowałby złe leady.
- **Bez sekcji opinii** — zero zmyślonych cytatów; do uzupełnienia po launch.
- **Brak liczb typu "X lat doświadczenia"** — nie mam pokrycia; sekcja stats zbudowana na faktach usługi (24 h wycena, 2 tury poprawek w cenie, 100% odpowiedzi na maile), nie na wymyślonych statystykach.

## Co świadomie pominięto

- Blog (default OFF), sklep/regulamin (brak sprzedaży online), cennik, opinie (brak materiału), portfolio prac (ryzyko prawno-wizerunkowe — fragmenty wzorcowe pokazuję na życzenie mailowo, nie publicznie).

## Materiały do uzupełnienia przez Karola po launch

- [ ] NIP / nazwa działalności / adres do polityki prywatności i stopki (placeholdery)
- [ ] Skrzynka `kontakt@pisanie-prac.pl` na Aftermarket + forwarding
- [ ] 3–5 prawdziwych opinii klientów (sekcja ukryta do tego czasu)
- [ ] Ewentualne przykładowe fragmenty wzorcowych prac (PDF) do wysyłki zainteresowanym
