<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-4.5-764ABC?logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" />
</p>

<h1 align="center">macOS Portfolio</h1>

<p align="center">
  Interactive macOS desktop experience built with React, GSAP, Zustand, and Tailwind CSS.
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/nguyendodary/macos-portfolio" />
  <img src="https://img.shields.io/github/stars/nguyendodary/macos-portfolio?style=social" />
</p>

---

## Features

- **Window Management** — Drag, resize, minimize, maximize, close. Z-index tracking via Zustand.
- **Apple Dock** — GSAP physics-based magnification. Bounce animation on app launch.
- **MenuBar** — Real-time clock, WiFi/Battery/Spotlight/Control Center icons.
- **Safari App** — Portfolio showcase with projects, skills, stats, and contact info.
- **Finder App** — File browser with sidebar navigation and file listing.
- **Traffic Lights** — Radial gradient buttons with hover-reveal icons (red/yellow/green).
- **Sonoma Wallpaper** — Multi-layer animated gradient mimicking macOS Ventura/Sonoma.

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | GSAP 3 |
| State | Zustand 4 |
| Production | Docker + Nginx |

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Docker** (optional, for containerized deployment)

## Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/nguyendodary/macos-portfolio.git
cd macos-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

Preview opens at [http://localhost:4173](http://localhost:4173).

## Run with Docker

### Option 1 — Docker Compose (recommended)

```bash
# Build and start
docker compose up -d --build

# Open http://localhost:3000
```

### Option 2 — Docker CLI

```bash
# Build image
docker build -t macos-portfolio .

# Run container
docker run -d -p 3000:80 --name macos-portfolio macos-portfolio

# Open http://localhost:3000
```

### Docker Commands

```bash
# Stop
docker compose down

# View logs
docker compose logs -f

# Rebuild from scratch
docker compose up -d --build --force-recreate

# Remove container + image
docker rmi macos-portfolio
```

## Project Structure

```
macos-portfolio/
├── Dockerfile                # Multi-stage: node build → nginx serve
├── docker-compose.yml        # Compose config (port 3000)
├── nginx.conf                # SPA routing + gzip + cache
├── .dockerignore             # Exclude node_modules, dist, .git
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component
    ├── index.css             # Tailwind + wallpaper + animations
    ├── stores/
    │   └── windowStore.js    # Zustand — window management core
    └── components/
        ├── MenuBar.jsx       # Top bar with Apple logo, clock
        ├── Desktop.jsx       # Wallpaper + desktop icons
        ├── Dock.jsx          # Magnification dock + SVG icons
        ├── WindowFrame.jsx   # Draggable/resizable window wrapper
        └── apps/
            ├── SafariApp.jsx # Portfolio showcase
            └── FinderApp.jsx # File browser
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview production build locally |

## Customization

### Change wallpaper

Edit `src/index.css` → `.wallpaper` class. Replace the gradient layers with your own.

### Add new apps

1. Create component in `src/components/apps/YourApp.jsx`
2. Add window defaults in `src/stores/windowStore.js` → `WINDOW_DEFAULTS`
3. Register in `src/App.jsx` → `APP_MAP`
4. Add dock icon in `src/components/Dock.jsx` → `DOCK_APPS`

### Update portfolio content

Edit `src/components/apps/SafariApp.jsx` → `PROJECTS` and `SKILLS` arrays.

## License

MIT
