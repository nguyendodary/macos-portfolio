import React, { useRef, useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'
import useWindowStore from '../stores/windowStore'

const DOCK_APPS = [
  { id: 'finder', name: 'Finder', icon: FinderIcon },
  { id: 'safari', name: 'Safari', icon: SafariIcon },
  'separator',
  { id: 'notes', name: 'Notes', icon: NotesIcon },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  { id: 'settings', name: 'Settings', icon: SettingsIcon },
  'separator',
  { id: 'folder', name: 'Projects', icon: FolderIcon, action: 'finder' },
]

export default function Dock() {
  const dockRef = useRef(null)
  const openWindows = useWindowStore((s) => s.openWindows)
  const windowStates = useWindowStore((s) => s.windowStates)
  const openWindow = useWindowStore((s) => s.openWindow)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const [bouncing, setBouncing] = useState(null)

  const BASE_SIZE = 50
  const MAX_SIZE = 80
  const MAG_RANGE = 150

  const handleMouseMove = useCallback((e) => {
    const dock = dockRef.current
    if (!dock) return

    const items = dock.querySelectorAll('.dock-item')
    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const dist = Math.abs(e.clientX - center)

      if (dist < MAG_RANGE) {
        const scale = 1 + (MAX_SIZE / BASE_SIZE - 1) * (1 - dist / MAG_RANGE)
        gsap.to(item, {
          width: BASE_SIZE * scale,
          height: BASE_SIZE * scale,
          y: -(scale - 1) * 15,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      } else {
        gsap.to(item, {
          width: BASE_SIZE,
          height: BASE_SIZE,
          y: 0,
          duration: 0.35,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto',
        })
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const dock = dockRef.current
    if (!dock) return
    const items = dock.querySelectorAll('.dock-item')
    items.forEach((item) => {
      gsap.to(item, { width: BASE_SIZE, height: BASE_SIZE, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
    })
  }, [])

  const launchApp = useCallback((appId) => {
    const ws = useWindowStore.getState()
    if (ws.openWindows.includes(appId)) {
      const winState = ws.windowStates[appId]
      if (winState?.minimized) {
        restoreWindow(appId)
      } else {
        openWindow(appId)
      }
    } else {
      openWindow(appId)
    }

    // Bounce
    setBouncing(appId)
    setTimeout(() => setBouncing(null), 700)
  }, [openWindow, restoreWindow])

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998]">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-end gap-[3px] px-2 pt-2 pb-1 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '0.5px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15), 0 10px 40px rgba(0,0,0,0.25), inset 0 0.5px 0 rgba(255,255,255,0.15)',
        }}
      >
        {DOCK_APPS.map((app, i) => {
          if (app === 'separator') {
            return <div key={`sep-${i}`} className="w-[1px] h-[42px] bg-white/20 mx-1 flex-shrink-0 self-end mb-1" />
          }

          const isOpen = openWindows.includes(app.id)
          const isMinimized = windowStates[app.id]?.minimized
          const isBouncing = bouncing === app.id
          const IconComponent = app.icon

          return (
            <div key={app.id} className="relative flex flex-col items-center">
              <button
                className={`dock-icon dock-item relative flex items-center justify-center cursor-pointer ${isBouncing ? 'animate-bounce-dock' : ''}`}
                style={{
                  width: BASE_SIZE,
                  height: BASE_SIZE,
                }}
                onClick={() => launchApp(app.action || app.id)}
              >
                <div
                  className="w-full h-full rounded-[12px] flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '0.5px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <IconComponent />
                </div>

                {/* Tooltip */}
                <div className="dock-tooltip">{app.name}</div>
              </button>

              {/* Open indicator */}
              {isOpen && (
                <div className={`w-1 h-1 rounded-full bg-white/70 mt-0.5 ${isMinimized ? 'opacity-30' : 'opacity-80'}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ===== SVG App Icons ===== */

function FinderIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="4" fill="linear-gradient(180deg, #5AC8FA, #007AFF)" />
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#4DA8F0" />
      <rect x="6" y="6" width="36" height="14" rx="4" fill="#3D9BED" />
      <circle cx="13" cy="13" r="2.5" fill="#FF5F57" />
      <circle cx="20" cy="13" r="2.5" fill="#FEBC2E" />
      <circle cx="27" cy="13" r="2.5" fill="#28C840" />
      <rect x="11" y="24" width="16" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="11" y="29" width="22" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="11" y="34" width="14" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}

function SafariIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="safari-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5AC8FA" />
          <stop offset="100%" stopColor="#007AFF" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#safari-grad)" />
      <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      {/* Compass face */}
      <circle cx="24" cy="24" r="16" fill="white" opacity="0.1" />
      {/* Red needle */}
      <path d="M24 8 L26 22 L24 24 L22 22 Z" fill="white" opacity="0.9" />
      <path d="M24 40 L22 26 L24 24 L26 26 Z" fill="#FF3B30" opacity="0.9" />
      {/* Crosshair */}
      <line x1="24" y1="8" x2="24" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1="8" y1="24" x2="40" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <circle cx="24" cy="24" r="2" fill="white" opacity="0.8" />
    </svg>
  )
}

function NotesIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="4" width="32" height="40" rx="4" fill="#FFF9C4" />
      <rect x="8" y="4" width="32" height="10" rx="4" fill="#FDD835" />
      <rect x="14" y="20" width="20" height="2" rx="1" fill="rgba(0,0,0,0.15)" />
      <rect x="14" y="26" width="24" height="2" rx="1" fill="rgba(0,0,0,0.1)" />
      <rect x="14" y="32" width="18" height="2" rx="1" fill="rgba(0,0,0,0.08)" />
    </svg>
  )
}

function TerminalIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="32" rx="6" fill="#1a1a1a" />
      <rect x="4" y="8" width="40" height="32" rx="6" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M14 22 L19 26 L14 30" stroke="#28C840" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="30" x2="32" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="settings-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#636366" />
          <stop offset="100%" stopColor="#48484A" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#settings-grad)" />
      <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
      <circle cx="24" cy="24" r="3" fill="white" opacity="0.7" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="22"
          y="10"
          width="4"
          height="6"
          rx="2"
          fill="white"
          opacity="0.8"
          transform={`rotate(${angle} 24 24)`}
        />
      ))}
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="36" height="32" viewBox="0 0 48 40" fill="none">
      <path d="M4 12C4 9.8 5.8 8 8 8H18L22 12H40C42.2 12 44 13.8 44 16V34C44 36.2 42.2 38 40 38H8C5.8 38 4 36.2 4 34V12Z" fill="#5AC8FA" />
      <path d="M4 16H44V34C44 36.2 42.2 38 40 38H8C5.8 38 4 36.2 4 34V16Z" fill="#64D2FF" />
    </svg>
  )
}
