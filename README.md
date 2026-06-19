# 🔮 Mystic Oracle — AI Fortune Teller

> AI-powered fortune telling web application — built with Next.js, OpenAI, and Firebase Firestore.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND (Browser)                        │
│                                                              │
│   /              →  Landing page + hero                      │
│   /fortune       →  Input form + fortune result              │
│   /history       →  Past readings (expandable cards)         │
│                                                              │
│   React 19 · Tailwind CSS · Framer Motion · TypeScript       │
└───────────────────────┬──────────────────────────────────────┘
                        │  HTTP POST /api/fortune
                        │  HTTP GET  /api/history
                        ▼
┌──────────────────────────────────────────────────────────────┐
│              BACKEND API  (Next.js API Routes)               │
│                  runs server-side only                        │
│                                                              │
│   Step 1 — Validate input        (Zod schema)                │
│   Step 2 — Build prompt          (Zodiac + Numerology)       │
│   Step 3 — Call OpenAI           (gpt-4o-mini)               │
│   Step 4 — Parse JSON response   (5 fortune sections)        │
│   Step 5 — Save to Firestore     (non-blocking)              │
│   Step 6 — Return result         (to frontend)               │
└──────────┬────────────────────────────┬──────────────────────┘
           │                            │
           ▼                            ▼
  ┌─────────────────┐       ┌──────────────────────────┐
  │   OpenAI API    │       │   Firebase Firestore      │
  │  gpt-4o-mini    │       │   Free Tier               │
  │  (server-side)  │       │   Collection: fortunes    │
  └─────────────────┘       └──────────────────────────┘
```

### Data Flow

1. User fills in **Name**, **Date of Birth**, and **Question**
2. Frontend sends `POST /api/fortune` with the data
3. API validates input with **Zod** (rejects bad data before touching the LLM)
4. **Prompt builder** enriches the request with Western Zodiac, Chinese Zodiac, and Life Path Number
5. **OpenAI (gpt-4o-mini)** returns structured JSON with 5 fortune sections
6. Record is saved to **Firebase Firestore** with timestamp and userId (failure here does not break the reading)
7. Result is returned and displayed with animated reveal on the frontend

### Key Design Decisions

| Decision | Reason |
|----------|--------|
| LLM called from API route (not client) | `OPENAI_API_KEY` never exposed to browser |
| Firebase write is non-blocking | Firestore failure never ruins the user's reading |
| Zod validation before prompt build | Prevents garbage input from reaching the LLM |
| Structured JSON prompt with `response_format` | Guarantees parseable 5-section response every time |
| Next.js App Router | Single deploy to Vercel with zero backend config |
| Google Auth required before fortune | Ensures history is tied to user identity |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS animations |
| Animation | Framer Motion |
| LLM | OpenAI (`gpt-4o-mini`) |
| Database | Firebase Firestore (Free Tier) |
| Authentication | Firebase Auth (Google Sign-In) |
| Validation | Zod |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Project Structure

```
ai-fortune-teller/
├── app/
│   ├── layout.tsx              # Root layout — Header + Footer + StarField
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Tailwind + custom mystic theme
│   ├── fortune/
│   │   └── page.tsx            # Fortune form + result (auth required)
│   ├── history/
│   │   └── page.tsx            # Reading history with search (auth required)
│   └── api/
│       ├── fortune/route.ts    # POST — validate → LLM → Firebase → return
│       └── history/route.ts    # GET  — fetch user's fortune records
│
├── components/
│   ├── Header.tsx              # Navigation + language toggle + auth
│   ├── Footer.tsx              # Credits footer
│   ├── StarField.tsx           # Canvas animated star background
│   ├── FortuneForm.tsx         # Input form with client-side validation
│   ├── FortuneResult.tsx       # Animated 5-section result display
│   ├── HistoryCard.tsx         # Expandable history card
│   └── LoadingOrb.tsx          # Crystal ball loading animation
│
├── context/
│   ├── AuthContext.tsx          # Firebase Google Auth provider
│   └── LanguageContext.tsx      # Thai/English language toggle
│
├── lib/
│   ├── openai.ts               # OpenAI API client (gpt-4o-mini)
│   ├── firebase.ts             # Firestore read/write + Firebase app init
│   ├── prompt-builder.ts       # Zodiac + numerology + prompt assembly
│   ├── validations.ts          # Zod input schema
│   └── translations.ts         # TH/EN translations
│
├── types/
│   └── fortune.ts              # TypeScript interfaces
│
├── .env.local.example          # Environment variable template
└── README.md
```

---

## Features

### Core Requirements

| Requirement | Status |
|-------------|--------|
| User input — Name, Date of Birth, Question | ✅ |
| Server-side input validation (Zod) | ✅ |
| Prompt engineering — Zodiac, Chinese Zodiac, Numerology | ✅ |
| LLM integration (OpenAI gpt-4o-mini) | ✅ |
| Structured 5-section fortune (Summary, Career, Finance, Relationship, Advice) | ✅ |
| Firebase Firestore storage (Name, DOB, Question, Response, Timestamp) | ✅ |
| Error handling — validation, API errors, Firebase failures | ✅ |
| Architecture — Frontend → Backend API → Prompt Builder → LLM → Firebase | ✅ |

### Bonus Features

| Bonus | Status |
|-------|--------|
| Authentication (Google Sign-In via Firebase Auth) | ✅ |
| Chat/Reading History (per-user, searchable) | ✅ |
| Responsive Design (mobile-first, hamburger menu) | ✅ |
| Bilingual UI (Thai/English toggle) | ✅ |
| Docker Support (Dockerfile + docker-compose) | ✅ |

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- [OpenAI API key](https://platform.openai.com/api-keys) (requires $5 credit)
- Firebase project with Firestore + Google Auth enabled (free tier)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
# From: platform.openai.com → API Keys
OPENAI_API_KEY=sk-proj-...

# From: Firebase Console → Project Settings → Your Apps → Web App Config
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com) → Create project
2. **Databases & Storage → Firestore Database** → Create database → Start in test mode
3. **Security → Authentication** → Get started → Enable **Google** provider
4. **Project Settings → Your apps** → Add web app → Copy config to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

```bash
npx vercel
```

Add all environment variables in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## Prompt Engineering

The prompt builder calculates three astrological/numerological values from the user's date of birth:

- **Western Zodiac Sign** — personality and elemental traits
- **Chinese Zodiac Animal** — 12-year cycle archetype
- **Life Path Number** — numerology core number (reduces to 1–9, 11, or 22)

These are injected into the system prompt to give the LLM rich context, producing a personalized reading rather than a generic response. The prompt requests structured JSON output with exactly 5 keys, and OpenAI's `response_format: { type: "json_object" }` ensures valid JSON is always returned.

---

## Docker

### Build & Run

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create `.env.local` before building (see `.env.local.example`), or pass variables via `docker compose`:

```bash
docker compose up --build -e OPENAI_API_KEY=sk-proj-...
```
