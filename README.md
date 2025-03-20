# DataVizz-Recruitment
# Data Dashboard

## 📌 Opis projektu
Data Dashboard to aplikacja webowa, która agreguje dane z różnych publicznych API i prezentuje je w formie czytelnego dashboardu. Użytkownicy mogą logować się za pomocą GitHub OAuth 2.0 i przeglądać interaktywne wykresy oraz statystyki dotyczące pogody, kursów kryptowalut oraz aktualnych wiadomości.

---

## 🚀 Funkcjonalności
- **Logowanie przez GitHub OAuth 2.0** 🔐
- **Pobieranie danych z publicznych API** 🌍
- **Interaktywne wykresy i wizualizacje** 📊
- **Filtry do wyboru danych (miasto)** 🔍
- **Automatyczna aktualizacja danych w czasie rzeczywistym** ⏳
- **Responsywny design (mobile & desktop)** 📱💻

---

## 🛠️ Technologie
- **React.js** ⚛️ - główny framework frontendowy
- **MUI (Material-UI)** 🎨 - komponenty UI
- **Recharts** 📈 - wizualizacja danych
- **React Router** 🛣️ - nawigacja między stronami
- **Axios** 📡 - obsługa zapytań do API

---

## 🔗 Wykorzystane API
| API | Opis |
|------|------|
| [OpenWeather API](https://openweathermap.org/api) | Pobieranie danych pogodowych |
| [CoinGecko API](https://www.coingecko.com/en/api) | Aktualne kursy kryptowalut |
| [NewsAPI](https://newsapi.org/) | Najnowsze wiadomości ze świata |
| [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps) | Autoryzacja użytkownika |

---

## 🛠️ Instalacja i uruchomienie

### ✅ **Wymagania**
- Node.js v16+ 📦
- Konto GitHub dla logowania 🔐
- Klucze API do OpenWeather, CoinGecko, NewsAPI 🔑

### 📥 **1. Pobranie kodu**
```bash
git clone https://github.com/twoj-user/data-dashboard.git
cd data-dashboard
git clone https://github.com/twoj-user/server.git
cd server
```

### 📦 **2. Instalacja zależności**

folder data-dashboard oraz server 

```bash
npm install
```

### 🔑 **3. Konfiguracja środowiska**
Utwórz plik `.env` w folderze data-dashboard oraz server i dodaj klucze API:
data-dashboard ->
```env
REACT_APP_GITHUB_CLIENT_ID=twoj_klucz
REACT_APP_API_URL=http://localhost:5001
REACT_APP_OPENWEATHER_API_KEY=twoj_klucz
REACT_APP_NEWS_API_KEY=twoj_klucz
```
server ->
```env
GITHUB_CLIENT_ID=twoj_klucz
GITHUB_CLIENT_SECRET=twoj_klucz
```

### ▶️ **4. Uruchomienie aplikacji**
data-dashboard
```bash
npm start
```
server
```bash
node index.js
```
Aplikacja będzie dostępna pod adresem: **http://localhost:3000** 🌍

---

## ✨ Autor
Stworzone przez **[BARTŁOMIEJ DADEJ]** 🚀
![Zrzut ekranu 2025-03-20 o 17 06 37](https://github.com/user-attachments/assets/ff67fd35-6fee-4f10-83f0-2f785a6e4fc9)
![Zrzut ekranu 2025-03-20 o 17 07 05](https://github.com/user-attachments/assets/d67eefd1-6e96-4b29-94c6-5e81c4a03150)
![Zrzut ekranu 2025-03-20 o 17 07 23](https://github.com/user-attachments/assets/324d1b79-2d49-49e7-b1b3-28d08d867f3f)
![Zrzut ekranu 2025-03-20 o 17 07 41](https://github.com/user-attachments/assets/6d2d37b0-4615-4039-a0c3-c60a6a911f1a)
