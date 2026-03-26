import React from 'react'
import useWindowStore from '../stores/windowStore'

const DESKTOP_ICONS = [
  { id: 'macintosh', label: 'Macintosh HD' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume.pdf' },
]

export default function Desktop({ children }) {
  const openWindow = useWindowStore((s) => s.openWindow)
  const focusWindow = useWindowStore((s) => s.focusWindow)

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget || e.target.closest('.wallpaper')) {
      focusWindow(null)
    }
  }

  return (
    <div
      className="wallpaper w-full h-full relative overflow-hidden"
      style={{ paddingTop: 'var(--menu-bar-height)' }}
      onClick={handleDesktopClick}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
        {DESKTOP_ICONS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-1 cursor-default group p-2 rounded-lg hover:bg-white/10 transition-colors"
            onDoubleClick={() => {
              if (item.id === 'projects') openWindow('finder')
              else if (item.id === 'resume') openWindow('safari')
            }}
          >
            <div className="w-16 h-16 flex items-center justify-center">
              {item.id === 'macintosh' && <MacintoshIcon />}
              {item.id === 'projects' && <FolderDesktopIcon />}
              {item.id === 'resume' && <PdfIcon />}
            </div>
            <span className="text-[11px] text-white text-center font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] px-1 py-0.5 rounded group-hover:bg-blue-500/50 transition-colors max-w-[76px] leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Windows Container */}
      <div className="absolute inset-0" style={{ top: 'var(--menu-bar-height)' }}>
        {children}
      </div>
    </div>
  )
}

function MacintoshIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="6" width="44" height="32" rx="4" fill="linear-gradient(180deg, #e8e8e8, #d0d0d0)" />
      <rect x="10" y="6" width="44" height="32" rx="4" fill="#e0e0e0" />
      <rect x="10" y="6" width="44" height="32" rx="4" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      <rect x="14" y="10" width="36" height="24" rx="2" fill="#1a1a2e" />
      <rect x="14" y="10" width="36" height="24" rx="2" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
      <path d="M14 10H50V22C50 22 38 28 32 28C26 28 14 22 14 22V10Z" fill="rgba(255,255,255,0.05)" />
      {/* Apple smile */}
      <circle cx="32" cy="19" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
      <path d="M29 22 Q32 25 35 22" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
      {/* Stand */}
      <rect x="24" y="38" width="16" height="3" rx="1.5" fill="#ccc" />
      <path d="M20 42 H44 L46 46 H18 Z" fill="linear-gradient(180deg, #d8d8d8, #c0c0c0)" />
      <path d="M20 42 H44 L46 46 H18 Z" fill="#ccc" />
    </svg>
  )
}

function FolderDesktopIcon() {
  return (
    <svg width="56" height="48" viewBox="0 0 64 52" fill="none">
      <path d="M4 14C4 11.8 5.8 10 8 10H22L26 14H56C58.2 14 60 15.8 60 18V44C60 46.2 58.2 48 56 48H8C5.8 48 4 46.2 4 44V14Z" fill="#5AC8FA" />
      <path d="M4 18H60V44C60 46.2 58.2 48 56 48H8C5.8 48 4 46.2 4 44V18Z" fill="#64D2FF" />
      <path d="M4 18H60V44C60 46.2 58.2 48 56 48H8C5.8 48 4 46.2 4 44V18Z" fill="url(#folder-shine)" />
      <defs>
        <linearGradient id="folder-shine" x1="32" y1="18" x2="32" y2="48">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg width="48" height="56" viewBox="0 0 48 60" fill="none">
      <path d="M6 4C6 2.9 6.9 2 8 2H32L42 12V56C42 57.1 41.1 58 40 58H8C6.9 58 6 57.1 6 56V4Z" fill="#f5f5f5" />
      <path d="M32 2L42 12H34C32.9 12 32 11.1 32 10V2Z" fill="#e0e0e0" />
      <rect x="12" y="22" width="24" height="3" rx="1.5" fill="#E53935" opacity="0.2" />
      <rect x="12" y="28" width="22" height="2" rx="1" fill="rgba(0,0,0,0.1)" />
      <rect x="12" y="33" width="24" height="2" rx="1" fill="rgba(0,0,0,0.08)" />
      <rect x="12" y="38" width="18" height="2" rx="1" fill="rgba(0,0,0,0.06)" />
      <text x="12" y="21" fontSize="6" fill="#E53935" fontWeight="bold" opacity="0.7">PDF</text>
    </svg>
  )
}
