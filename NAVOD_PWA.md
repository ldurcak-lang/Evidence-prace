# Evidence práce - PWA Aplikace pro Android

## 📱 Co jste dostali

### PWA soubory pro pracovníky:

**Arnošt (modrá):**
- arnost_pwa.html
- manifest_arnost.json
- icon-192-arnost.png
- icon-512-arnost.png

**Ivan (zelená):**
- ivan_pwa.html
- manifest_ivan.json
- icon-192-ivan.png
- icon-512-ivan.png

**Víťa (červená):**
- vita_pwa.html
- manifest_vita.json
- icon-192-vita.png
- icon-512-vita.png

**Společné soubory:**
- service-worker.js
- google_apps_script.js

## 🎯 Co je PWA?

**Progressive Web App** = webová aplikace, která se chová jako nativní Android aplikace:
- ✅ Ikona na ploše Android
- ✅ Funguje i offline
- ✅ Rychlá jako nativní aplikace
- ✅ Žádný Google Play
- ✅ Automatické aktualizace

## 🚀 Instalace - Krok za krokem

### KROK 1: Nastavení Google Sheets (stejné jako předtím)

1. Vytvořte **Google Sheets** s hlavičkou
2. Nastavte **Google Apps Script** jako backend
3. Zkopírujte **URL nasazení** Apps Scriptu
4. V každém PWA souboru nahraďte `YOUR_SCRIPT_ID` za vaše URL

> Podrobný návod viz soubor `NAVOD_Google_Sheets.md`

### KROK 2: Nahrání na webhosting

PWA **MUSÍ být na HTTPS** (bezpečné připojení). Máte tyto možnosti:

#### Varianta A: OneDrive (NEDOPORUČUJI pro PWA)
- OneDrive neumožňuje správné HTTPS chování pro PWA
- Použijte variantu B nebo C

#### Varianta B: GitHub Pages (ZDARMA, doporučuji)

1. Vytvořte **GitHub účet** (github.com)
2. Vytvořte nový **repository** (např. "evidence-prace")
3. Nahrajte všechny soubory:
   - 3x HTML soubory
   - 3x manifest soubory
   - 6x ikony
   - 1x service-worker.js
4. **Zapněte GitHub Pages**:
   - Settings → Pages
   - Source: main branch
   - Save
5. Váš web bude na: `https://username.github.io/evidence-prace/`

#### Varianta C: Vlastní webhosting
- Nahrajte soubory na váš webhosting s HTTPS
- Ujistěte se, že server podporuje HTTPS

### KROK 3: Instalace na Android telefon

#### Pro Arnošta:

1. Otevře Chrome na Android
2. Navštíví: `https://vase-domena.cz/arnost_pwa.html`
3. **První návštěva** - zobrazí se zelený banner:
   - "📲 Nainstalovat aplikaci"
   - Klikne "Instalovat"
4. Android přidá ikonu na plochu
5. **Vyplní Google Sheet ID** (jen jednou)
6. Hotovo! Může začít používat

#### Pro Ivana a Víťu:
- Stejný postup s jejich URL (`ivan_pwa.html`, `vita_pwa.html`)

## 📱 Jak pracovníci používají PWA

### Po instalaci:

1. **Kliknou na ikonu** na ploše Android
2. Aplikace se otevře **na celou obrazovku** (bez Chrome lišty)
3. **Vyplní formulář** stejně jako v běžné aplikaci
4. **Kliknou "Uložit"** → data se odešlou do Google Sheets

### Offline režim:

- Pokud nemají internet, zobrazí se: "📶 Offline režim"
- Data se uloží lokálně v telefonu
- Po připojení k internetu se data synchronizují

## ✨ Výhody PWA

✅ **Ikona na ploše** - jako běžná aplikace  
✅ **Celá obrazovka** - bez Chrome lišty  
✅ **Offline režim** - funguje bez internetu  
✅ **Rychlé načítání** - cache  
✅ **Automatické aktualizace** - při návštěvě webu  
✅ **Žádný Google Play** - instalace z webu  
✅ **Push notifikace** - (můžeme přidat později)  
✅ **Malá velikost** - pár KB  

## 🔧 Technické detaily

### Service Worker:
- Zajišťuje offline režim
- Cachuje soubory pro rychlé načítání
- Automaticky se aktualizuje

### Manifest:
- Definuje vzhled aplikace
- Ikony, barvy, název
- Orientace obrazovky

### LocalStorage:
- Ukládá poslední záznamy (max 10)
- Záloha při offline režimu
- Rychlý náhled historie

## 🎨 Vzhled aplikace

```
┌─────────────────────────┐
│  👷 Arnošt              │ <- Modrá hlavička
│  Evidence práce         │
│  📱 PWA aplikace        │
├─────────────────────────┤
│ 📲 Nainstalovat app     │ <- Zelený banner
│    [Instalovat]         │    (jen při první návštěvě)
├─────────────────────────┤
│ ➕ Nový záznam          │
│                         │
│ 📅 úterý 11. února 2026│
│                         │
│ ⏰ Příchod    🏁 Odchod│
│ [07:00]      [15:30]   │
│                         │
│ Zakázka 1               │
│ 📋 Název                │
│ 🔢 Číslo                │
│ 🔧 Druh práce           │
│ ⏱️ Hodiny               │
│                         │
│ [+ Přidat zakázku]      │
│                         │
│ [💾 Uložit]             │
├─────────────────────────┤
│ 📊 Přehled měsíce       │
│                         │
│  Celkem    Pracovních   │
│  hodin        dnů       │
│   160         20        │
│                         │
│ [📊 Otevřít Sheets]     │
├─────────────────────────┤
│ 📝 Poslední záznamy     │
│                         │
│ [Seznam záznamů...]     │
└─────────────────────────┘
```

## 📊 Testování PWA

### Před distribucí pracovníkům:

1. **Otevřete v Chrome** (desktop nebo Android)
2. **Otevřete DevTools** (F12)
3. **Lighthouse** → Generate report
4. **Zkontrolujte PWA skóre** (mělo by být 100%)

### Kontrolní seznam:
- ✅ HTTPS funguje
- ✅ Manifest je přístupný
- ✅ Ikony se načítají
- ✅ Service Worker se registruje
- ✅ Install prompt se zobrazuje
- ✅ Offline režim funguje

## 🆘 Řešení problémů

### "Tlačítko Instalovat se nezobrazuje"

**Možné příčiny:**
1. Není HTTPS - PWA vyžaduje bezpečné připojení
2. Manifest není správně nastaven
3. Chrome už aplikaci nainstaloval (zkontrolujte plochu)
4. Service Worker se neregistroval

**Řešení:**
- Použijte GitHub Pages (má HTTPS)
- Zkontrolujte manifest.json (musí být přístupný)
- Smažte cache v Chrome: Settings → Clear browsing data

### "Aplikace nefunguje offline"

**Řešení:**
- Zkontrolujte, že service-worker.js je přístupný
- Otevřete Chrome DevTools → Application → Service Workers
- Zkontrolujte, že je registered a running

### "Data se neukládají do Google Sheets"

**Řešení:**
- Zkontrolujte nastavení Google Apps Script
- Ověřte, že jste nahradili `YOUR_SCRIPT_ID`
- Zkontrolujte console v Chrome DevTools pro chyby

### "Ikona není na ploše"

**Řešení:**
- Někdy trvá pár sekund, než se ikona objeví
- Restartujte launcher (dlouhý stisk na plochu → Restart)
- Zkontrolujte v Chrome: Menu → Install app

## 📱 Alternativní instalace

Pokud "Instalovat" tlačítko nefunguje:

### Chrome Menu:
1. Otevřete PWA v Chrome
2. Menu (⋮) → **"Přidat na plochu"** nebo **"Install app"**
3. Potvrzit

### Samsung Internet:
1. Otevřete PWA v Samsung Internet
2. Menu → **"Přidat na plochu"**
3. Potvrzit

## 💡 Tipy pro pracovníky

### První použití:
1. Nainstalovat aplikaci z Chrome
2. Vyplnit Google Sheet ID (jen jednou)
3. Začít vyplňovat

### Denní použití:
1. Kliknout na ikonu na ploše
2. Aplikace se otevře na celou obrazovku
3. Vyplnit a uložit

### Aktualizace:
- PWA se aktualizuje automaticky
- Stačí otevřít aplikaci s internetem
- Žádné ruční aktualizace

## 🔐 Bezpečnost

- **HTTPS** - šifrované připojení
- **LocalStorage** - data pouze v telefonu pracovníka
- **Google Sheets** - centrální ukládání
- **Service Worker** - běží v izolovaném prostředí

## 📧 Instrukce pro pracovníky (zkopírujte a pošlete)

```
Dobrý den,

instalace aplikace Evidence práce:

1. INSTALACE:
   - Otevřete Chrome na telefonu
   - Navštivte: [VÁŠ ODKAZ]
   - Klikněte na zelené tlačítko "Instalovat"
   - Ikona se přidá na plochu

2. PRVNÍ NASTAVENÍ:
   - Otevřete aplikaci z plochy
   - Vyplňte toto ID: [VAŠE SHEET ID]
   - Klikněte "Uložit"

3. DENNÍ POUŽITÍ:
   - Klikněte na ikonu na ploše
   - Vyplňte příchod, odchod, zakázky
   - Klikněte "Uložit"
   - Hotovo!

Aplikace funguje i bez internetu.
Data se automaticky synchronizují.

Děkuji!
```

## 🎓 Důležité poznámky

### GitHub Pages hosting:
- **Zdarma**
- **HTTPS** automaticky
- **Rychlý**
- **Spolehlivý**

### OneDrive hosting:
- **Nefunguje** pro PWA
- Chybí správná HTTPS podpora
- Service Worker se neregistruje

### Vlastní webhosting:
- Musí mít **HTTPS**
- Musí podporovat **Service Workers**
- Doporučuji otestovat před distribucí

---

**Vytvořeno:** 2026  
**Verze:** 4.0 PWA Edition  
**Platforma:** Android (Chrome 80+, Samsung Internet 12+)
