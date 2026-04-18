# NurulQuran

A complete Quran web application with Arabic text and English translation.

## Features
- Browse all 114 Surahs
- Read full Ayat with Arabic text and English translation
- Search across all Ayahs by translation text
- Customizable Arabic font (3 options) and font sizes
- Settings persist across sessions
- Responsive design, mobile-friendly

## Tech Stack
- Backend: Node.js + Express
- Frontend: Next.js 14 (App Router, SSG)
- Styling: Tailwind CSS

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
git clone 
cd NurulQuran
npm run install:all

### Create environment files

backend/.env:
PORT=4000
FRONTEND_URL=http://localhost:3000

frontend/.env.local:
NEXT_PUBLIC_API_URL=http://localhost:4000

### Run
npm run dev

Backend: http://localhost:4000
Frontend: http://localhost:3000

## API Reference
GET /api/surahs               — All 114 surahs
GET /api/surahs/:id/ayahs    — All ayahs for a surah
GET /api/search?q=&page=&limit= — Search by translation
GET /health                   — Health check

## Deployment
- Frontend → Vercel (set NEXT_PUBLIC_API_URL to your backend URL)
- Backend → Railway or Render (set PORT and FRONTEND_URL)

## Live Demo
[Add your Vercel URL here]
