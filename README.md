# Stop Scout · część I

Mobilna tablica przykładowych odjazdów gdańskiej komunikacji miejskiej. Na karcie widać numer linii, kierunek, godzinę rozkładową i opóźnienie. Dolne zakładki prowadzą do tablicy oraz legendy. Dane są zapisane w projekcie i pozostają takie same po ponownym uruchomieniu.

## Uruchomienie na telefonie

Projekt używa TypeScriptu, React Native i Expo SDK 57. Potrzebujesz Node.js 24 LTS, npm i aplikacji Expo Go zgodnej z SDK 57. Otwórz terminal w katalogu zawierającym `package.json`.

```sh
npm ci
npm start
```

Komputer i telefon połącz z tą samą siecią Wi-Fi. Na Androidzie zeskanuj wyświetlony kod QR w Expo Go, a na iOS użyj aparatu. Metro przygotuje i prześle aplikację na telefon. Jeśli aplikacja pamięta starszy kod, zatrzymaj Metro i wykonaj `npx expo start --clear`. Polecenie `npm run web` uruchamia wersję przeglądarkową do pracy nad układem.

## Od pliku do ekranu

| Plik lub katalog | Odpowiedzialność |
|---|---|
| `app/_layout.tsx` | Główny układ nawigacji aplikacji. |
| `app/(tabs)/_layout.tsx` | Konfiguracja dwóch zakładek Expo Routera. Plik `index.tsx` odpowiada ścieżce `/`, a `legend.tsx` ścieżce `/legend`. |
| `src/infrastructure/mock/departures.ts` | Typ pojedynczego rekordu i dziewięć przykładowych odjazdów. Pole `id` identyfikuje odjazd. Jedna linia może mieć wiele odjazdów. |
| `app/(tabs)/index.tsx` | Stan lokalny i przewijana tablica. `FlatList` dostaje rekordy, funkcję wyznaczania klucza oraz funkcję renderującą wiersz. |
| `components/DepartureCard.tsx` | Typowany komponent wiersza. Wyświetla wynik normalizacji numeru, kierunek i godzinę oraz przekazuje opóźnienie do etykiety. |
| `src/domain/value-objects/RouteNumber.ts` | Normalizuje numer linii. Obsługuje prefiksy TRISTAR, białe znaki, numery tekstowe i linie nocne. |
| `src/domain/value-objects/DepartureDelay.ts` | Wyznacza kategorię, napis i potrzebę animacji. |
| `components/DelayHighlight.tsx` | Przypisuje kategorii styl i steruje przezroczystością etykiety. |
| `app/(tabs)/legend.tsx` | Pokazuje znaczenie trzech oznaczeń przy użyciu tego samego komponentu co tablica. |

W `src/` przygotowano też katalogi dla encji, kontraktów repozytoriów, przypadków użycia, infrastruktury, globalnego stanu i wstrzykiwania zależności. Pliki `.gitkeep` pozwalają zachować te katalogi w Git. Dwie klasy domenowe działają niezależnie od Reacta i Expo. Ich pola są oznaczone jako `readonly`, a metoda `equals` porównuje wartości.

## Przykład działania

1. Na ekran trafia rekord o identyfikatorze `6`. Ma on `routeId: 10177`, kierunek Brętowo PKM, godzinę 19:36 i opóźnienie 210 sekund.
2. `FlatList` używa `id` jako klucza. Funkcja `renderItem` przekazuje pola rekordu do `DepartureCard`.
3. Karta tworzy `RouteNumber`. Dla identyfikatora co najmniej 10000 reszta z dzielenia przez 10000 usuwa prefiks operatora. Pasażer widzi **177**. Zwykły numer 9 pozostaje 9, a tekst `" n1 "` staje się `N1`.
4. `DelayHighlight` tworzy `DepartureDelay(210)`. Obiekt przypisuje kategorię `MAJOR`. Dzielenie przez 60 daje 3,5, a `Math.floor` zachowuje trzy pełne minuty. Etykieta pokazuje **+3 min**.
5. `useRef` przechowuje wartość animowanej przezroczystości między renderami. `useEffect` uruchamia cykl 700 ms przygasania i 700 ms rozjaśniania. `useNativeDriver: true` przekazuje animację przezroczystości do warstwy natywnej. Przy usunięciu wiersza efekt zatrzymuje pętlę. Po zmianie dużego opóźnienia na małe etykieta odzyskuje pełną widoczność.

| Surowa wartość | Napis | Zachowanie |
|---|---|---|
| `null`, `undefined`, zero lub wartość ujemna | Na czas | Zgodnie z instrukcją zielony, stały napis obejmuje również brak pomiaru. |
| 119 sekund | +119s | Ciemnożółty, stały napis. |
| 120–179 sekund | +2 min | Czerwony, pogrubiony, pulsujący napis. |
| 180–239 sekund | +3 min | Czerwony, pogrubiony, pulsujący napis. |

## Sprawdzenie przed oddaniem

- Uruchom `npm run typecheck`, aby sprawdzić typy. Polecenie `npx expo export --platform android` sprawdza zbudowanie paczki JavaScript dla Androida.
- W Expo Go otwórz zakładkę **Odjazdy**. Sprawdź linię 2 (Na czas), linię 9 (+12s) i linię 12 (+2 min). Przewiń do linii 177 i sprawdź pulsujące +3 min.
- W zakładce **Legenda** sprawdź trzy kategorie. Wróć do odjazdów przez dolny pasek.
- Zrób zrzuty z fizycznego telefonu i dodaj je do katalogu `screenshots/` w archiwum. Warto uchwycić linię 177 i wszystkie trzy rodzaje etykiet. Sam ruch pokaż przy uruchomionej aplikacji.
- Na Moodle oddaj plik `Etap1_Imie_Nazwisko_NrIndeksu.zip` po zastąpieniu pól własnymi danymi. ZIP powinien zawierać źródła, konfigurację, blokadę zależności i zrzuty. Pomiń `node_modules/`, `.expo/`, `.git/` i katalog eksportu `dist/`.

[Instrukcja przedmiotu i kryteria oceniania](https://goluch.github.io/PAL/ProgUrzMob.html)
