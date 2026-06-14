# Veridian Immigration Services — Project Overview

> *Your Journey. Our Commitment. Your Future.*

A complete full-stack website for **Veridian Immigration Services (Dubai)** — a public marketing site with a lead-capture enquiry form that saves every enquiry into a Google Sheet in real time.

**Live site:** https://www.veridianimmigration.com
**Repository:** https://github.com/harshadok/veridian-immigration

---

## 1. What was built

| Area | Summary |
|------|---------|
| **Marketing website** | Hero, About, Services (6), Destinations (8 countries), Process timeline, Team, Testimonials, Contact |
| **Lead capture** | "Quick Enquiry" form + auto-opening welcome popup |
| **Data flow** | Enquiries saved to a **Google Sheet** + emailed to the team |
| **Extras** | Floating WhatsApp button, SEO (sitemap/robots/JSON-LD), HTTPS & security headers |

---

## 2. Technology stack

### Frontend
- **Next.js 14** (App Router) — React framework, server + static rendering
- **React 18** — UI library
- **Tailwind CSS 3** — styling
- **Framer Motion** — animations
- **Lucide React** — icons
- **Brand fonts:** Cormorant Garamond (display) + Plus Jakarta Sans (body)
- **Brand palette:** Deep Emerald `#062c1e` · Forest `#0d4e34` · Gold `#b88a23` · Cream `#faf7f0`

### Backend
- **Node.js + Express 4** — REST API server
- **googleapis** — writes enquiries to Google Sheets
- **Nodemailer** — email notifications via SMTP
- **express-validator** — validates form input
- **express-rate-limit** — anti-spam (10 submissions / IP / 15 min)
- **helmet** — security headers
- **cors** — controls who can call the API
- **morgan** — request logging
- **dotenv** — environment config

---

## 3. Packages used (full list)

### Frontend — `frontend/package.json`

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2.5 | React framework (App Router, routing, SSR/SSG, image optimization) |
| `react` | ^18.3.1 | UI library |
| `react-dom` | ^18.3.1 | React renderer for the browser |
| `lucide-react` | ^0.408.0 | Icon set |
| `framer-motion` | ^11.3.8 | Animations & transitions |
| `tailwindcss` | ^3.4.6 | Utility-first CSS framework *(dev)* |
| `postcss` | ^8.4.39 | CSS processing pipeline *(dev)* |
| `autoprefixer` | ^10.4.19 | Adds vendor prefixes to CSS *(dev)* |
| `eslint` | ^8.57.0 | Code linting *(dev)* |
| `eslint-config-next` | 14.2.5 | Next.js lint rules *(dev)* |

### Backend — `backend/package.json`

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.19.2 | Web server & routing |
| `googleapis` | ^173.0.0 | Google Sheets API (saves enquiries) |
| `nodemailer` | ^6.9.14 | Sends email notifications via SMTP |
| `express-validator` | ^7.2.0 | Validates & sanitizes form fields |
| `express-rate-limit` | ^7.4.0 | Limits submissions per IP (anti-spam) |
| `helmet` | ^7.1.0 | Sets secure HTTP headers |
| `cors` | ^2.8.5 | Cross-origin request control |
| `morgan` | ^1.10.0 | HTTP request logging |
| `dotenv` | ^16.4.5 | Loads environment variables from `.env` |
| `nodemon` | ^3.1.4 | Auto-restart in development *(dev)* |

---

## 4. How it all connects

```
Visitor's browser
      │  submits "Quick Enquiry" form
      ▼
Next.js proxy route  (frontend/src/app/api/enquiry/route.js, on Vercel)
      │  forwards to API_URL (server-to-server)
      ▼
Express backend  (backend/server.js, on Render)
      │  validates → rate-limits
      ├──────────────► Google Sheet   (appends a row)
      └──────────────► Email (SMTP)    (notifies the team)
```

**Why the proxy?** The browser only talks to the same-origin Next.js route, so there are no CORS issues and the backend URL stays private. The Next.js route reads `API_URL` to know where the backend lives.

> ⚠️ **Critical config:** On Vercel, the env var `API_URL` **must** point to the live backend URL. If it's missing, the proxy falls back to `localhost:5050` and the form silently fails in production.

---

## 5. Project structure

```
veridian-immigration/
├── frontend/                        # Next.js app (deployed to Vercel)
│   ├── public/logo.jpeg
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js            # Metadata, fonts, JSON-LD SEO schema
│   │   │   ├── page.js              # Home page (assembles all sections)
│   │   │   ├── globals.css
│   │   │   ├── robots.js            # /robots.txt
│   │   │   ├── sitemap.js           # /sitemap.xml
│   │   │   └── api/enquiry/route.js # Proxy → forwards form to backend
│   │   ├── components/              # Navbar, Hero, Services, Countries,
│   │   │                            #   Team, Testimonials, EnquiryForm,
│   │   │                            #   WhatsAppFloat, WelcomePopup, Footer …
│   │   ├── data/site.js             # All editable content (company, services…)
│   │   └── lib/enquiryApi.js        # Front-end form submit helper
│   ├── tailwind.config.js
│   ├── next.config.js               # Security headers, image formats
│   └── package.json
│
└── backend/                         # Express API (deployed to Render)
    ├── server.js                    # App entry, middleware, routes
    ├── routes/enquiry.js            # POST /api/enquiry (validate + save)
    ├── utils/googleSheets.js        # Google Sheets integration
    ├── utils/mailer.js              # Email notifications
    ├── data/                        # Local backup of enquiries
    ├── .env.example                 # Template for required secrets
    └── package.json
```

---

## 6. Backend API

| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/` | Health check |
| POST | `/api/enquiry` | Submit a lead (validated + rate-limited) |
| GET | `/api/enquiry` | Admin list — requires header `x-admin-key` |

---

## 7. Deployment

| Part | Host | Notes |
|------|------|-------|
| **Frontend** | **Vercel** | Custom domain `veridianimmigration.com`, auto HTTPS |
| **Backend** | **Render** (free tier) | Sleeps after ~15 min idle → first request may take ~30s |
| **Data store** | **Google Sheets** | Service-account access; enquiries appended live |

**Required environment variables**

*Vercel (frontend):*
- `API_URL` → live backend URL
- `NEXT_PUBLIC_SITE_URL` → `https://www.veridianimmigration.com`

*Render (backend):*
- `GOOGLE_SPREADSHEET_ID`, `GOOGLE_SHEET_NAME`, `GOOGLE_SERVICE_ACCOUNT_KEY_BASE64`
- `CORS_ORIGIN` → `https://www.veridianimmigration.com`
- `ADMIN_KEY`
- `SMTP_*` + `NOTIFY_EMAIL` (for email notifications)

---

## 8. How to edit content

| To change… | Edit |
|------------|------|
| Company info (phone, email, address) | `frontend/src/data/site.js → COMPANY` |
| Services / Destinations / Team / Testimonials | `frontend/src/data/site.js` |
| Brand colors & fonts | `frontend/tailwind.config.js` + `globals.css` |
| Logo | Replace `frontend/public/logo.jpeg` |
| Hero text / images | `frontend/src/components/Hero.js` |

---

## 9. Known placeholders to finalize

- Phone number: `+971 56 268 3678`
- Email: `info@veridianimmigration.com`
- Testimonials (sample text — replace with real client stories)

---

*Built with Next.js, Node.js/Express, and Google Sheets. © Veridian Immigration Services, Dubai.*
