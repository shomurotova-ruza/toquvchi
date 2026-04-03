# To'quvchi qiz

**To'quvchi qiz** — bu individual kurs ishi uchun yaratilgan oddiy full-stack veb loyiha.  
Sayt to‘qish darslari, foydali ma’lumotlar va boshlovchilar uchun o‘quv materiallari haqida.

Loyiha 2 qismdan iborat:

- `client` — frontend
- `server` — backend

---

## GitHub manzili

Loyihani GitHub orqali yuklab olish:

```bash
git clone https://github.com/shomurotova-ruza/toquvchi.git
```

Keyin loyiha papkasiga kirish:

```bash
cd toquvchi
```

---

## Loyihani ishga tushirish uchun nimalar kerak

Loyihani kompyuterda ishga tushirishdan oldin quyidagilar o‘rnatilgan bo‘lishi kerak:

### 1. Node.js

Node.js frontend va backendni ishga tushirish uchun kerak bo‘ladi.  
Node.js o‘rnatilganda `npm` ham birga o‘rnatiladi.

Tekshirish uchun terminal yoki PowerShell’da yozing:

```bash
node -v
npm -v
```

Agar versiya raqamlari chiqsa, demak to‘g‘ri o‘rnatilgan.

### 2. Git

Git loyihani GitHub’dan yuklab olish uchun kerak.

Tekshirish:

```bash
git --version
```

Agar versiya chiqsa, Git o‘rnatilgan.

### 3. Kod muharriri

Loyihani ochish va ishlatish uchun kod muharriri kerak bo‘ladi.

Tavsiya etiladi:

- Visual Studio Code

### 4. Brauzer

Saytni ko‘rish uchun brauzer kerak bo‘ladi.

Masalan:

- Google Chrome
- Microsoft Edge

### 5. Internet

Birinchi marta `npm install` qilganda internet kerak bo‘ladi, chunki kerakli paketlar yuklab olinadi.

---

## Loyiha tuzilishi

Loyiha papkasi taxminan quyidagicha bo‘ladi:

```bash
toquvchi
├── client
├── server
└── README.md
```

### Papkalar haqida

- `client` — saytning tashqi ko‘rinishi, sahifalari, tugmalari va formalar
- `server` — backend qismi, server logikasi va API
- `README.md` — loyiha haqida qisqacha ma’lumot va ishga tushirish yo‘riqnomasi

---

## Loyihani yuklab olish

### 1-qadam: GitHub’dan clone qiling

```bash
git clone https://github.com/shomurotova-ruza/toquvchi.git
```

### 2-qadam: loyiha papkasiga kiring

```bash
cd toquvchi
```

---

## Client qismini ishga tushirish

Client — bu frontend qismi.

### 1-qadam: `client` papkaga kiring

```bash
cd client
```

### 2-qadam: kerakli paketlarni o‘rnating

```bash
npm install
```

Bu buyruq frontend uchun kerakli kutubxonalarni o‘rnatadi.

### 3-qadam: clientni ishga tushiring

```bash
npm run dev
```

Keyin brauzerda quyidagi manzilni oching:

```bash
http://localhost:3000
```

Agar `3000` port band bo‘lsa, terminal boshqa port ko‘rsatishi mumkin.

---

## Server qismini ishga tushirish

Server — bu backend qismi.

Yangi terminal oching va loyiha papkasiga kiring:

```bash
cd toquvchi
```

### 1-qadam: `server` papkaga kiring

```bash
cd server
```

### 2-qadam: kerakli paketlarni o‘rnating

```bash
npm install
```

Bu buyruq backend uchun kerakli paketlarni o‘rnatadi.

### 3-qadam: serverni ishga tushiring

Avval shuni sinab ko‘ring:

```bash
npm run dev
```

Agar ishlamasa, quyidagini yozing:

```bash
npm start
```

---

## Muhim eslatma

Loyiha to‘liq ishlashi uchun `client` va `server` **alohida-alohida ishga tushirilishi kerak**.

Ya’ni 2 ta terminal ochiladi:

- 1-terminal — `client`
- 2-terminal — `server`

### 1-terminal

```bash
cd toquvchi
cd client
npm install
npm run dev
```

### 2-terminal

```bash
cd toquvchi
cd server
npm install
npm run dev
```

Agar kerak bo‘lsa:

```bash
npm start
```

---

## Saytni ochish

Client ishga tushgandan keyin brauzerda quyidagi manzilni oching:

```bash
http://localhost:3000
```

Shu manzilda sayt ishlaydi.

---

## Loyiha ishlashi uchun kerak bo‘ladigan narsalar

Bu loyihani ishga tushirish uchun quyidagilar kerak:

- Windows, Linux yoki macOS kompyuter
- Node.js
- npm
- Git
- internet (`npm install` uchun)
- terminal yoki PowerShell
- brauzer

---

## Birinchi marta ishga tushirish

Agar loyiha birinchi marta ishga tushirilayotgan bo‘lsa, quyidagilar bajariladi.

### Client uchun

```bash
cd client
npm install
npm run dev
```

### Server uchun

```bash
cd server
npm install
npm run dev
```

Bu odatda birinchi marta yoki `node_modules` o‘chirilgandan keyin kerak bo‘ladi.

---

## Xatolar chiqsa

### 1. `package.json not found`

Bu siz noto‘g‘ri papkada buyruq yozayotganingizni bildiradi.

Siz `client` yoki `server` ichida turishingiz kerak.

To‘g‘ri misol:

```bash
cd toquvchi
cd client
npm install
```

yoki

```bash
cd toquvchi
cd server
npm install
```

### 2. `npm is not recognized`

Bu Node.js kompyuterga o‘rnatilmaganini yoki noto‘g‘ri o‘rnatilganini bildiradi.

Avval Node.js o‘rnating.

### 3. Port band bo‘lsa

Boshqa dastur o‘sha portdan foydalanayotgan bo‘lishi mumkin.

Boshqa local serverlarni yoping yoki terminalda ko‘rsatilgan yangi portdan foydalaning.

### 4. Paketlar topilmasa

Quyidagi buyruqni qayta yozing:

```bash
npm install
```

---

## Loyihani to‘xtatish

Ishlayotgan client yoki serverni to‘xtatish uchun terminalga bosib:

```bash
Ctrl + C
```

qiling.

---

## Qisqacha tartib

1. Node.js, npm va Git o‘rnating
2. GitHub’dan loyihani yuklab oling
3. `client` papkani ishga tushiring
4. `server` papkani ishga tushiring
5. Brauzerda saytni oching

---

## Tezkor buyruqlar

### Loyihani yuklab olish

```bash
git clone https://github.com/shomurotova-ruza/toquvchi.git
cd toquvchi
```

### Clientni ishga tushirish

```bash
cd client
npm install
npm run dev
```

### Serverni ishga tushirish

```bash
cd server
npm install
npm run dev
```

Agar kerak bo‘lsa:

```bash
npm start
```

---

## Muallif

Ushbu loyiha individual kurs ishi uchun Roza tomonidan tayyorlangan.
