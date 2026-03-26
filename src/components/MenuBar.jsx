import React, { useState, useEffect } from 'react'
import useWindowStore from '../stores/windowStore'

export default function MenuBar() {
  const focusedWindow = useWindowStore((s) => s.focusedWindow)
  const windowStates = useWindowStore((s) => s.windowStates)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const activeTitle = focusedWindow && windowStates[focusedWindow]
    ? windowStates[focusedWindow].title
    : 'Finder'

  const dayName = time.toLocaleDateString('en-US', { weekday: 'short' })
  const monthDay = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const clockTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-7 flex items-center justify-between px-[12px] text-[13px] font-medium text-white/90"
      style={{
        background: 'rgba(22, 22, 22, 0.72)',
        backdropFilter: 'blur(50px) saturate(200%)',
        WebkitBackdropFilter: 'blur(50px) saturate(200%)',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Left side */}
      <div className="flex items-center gap-[2px] h-full">
        <button className="menu-item-hover h-full flex items-center px-2 rounded-[4px]">
          <AppleLogo />
        </button>
        <button className="menu-item-hover h-full flex items-center px-2.5 rounded-[4px] font-semibold text-[13px]">
          {activeTitle}
        </button>
        <button className="menu-item-hover h-full flex items-center px-2.5 rounded-[4px] text-[13px] text-white/75">File</button>
        <button className="menu-item-hover h-full flex items-center px-2.5 rounded-[4px] text-[13px] text-white/75">Edit</button>
        <button className="menu-item-hover h-full flex items-center px-2.5 rounded-[4px] text-[13px] text-white/75">View</button>
        <button className="menu-item-hover h-full flex items-center px-2.5 rounded-[4px] text-[13px] text-white/75">Go</button>
        <button className="menu-item-hover h-full flex items-center px-2.5 rounded-[4px] text-[13px] text-white/75">Window</button>
        <button className="menu-item-hover h-full flex items-center px-2.5 rounded-[4px] text-[13px] text-white/75">Help</button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-[2px] h-full">
        <button className="menu-item-hover h-full flex items-center px-1.5 rounded-[4px]">
          <BatteryIcon />
        </button>
        <button className="menu-item-hover h-full flex items-center px-1.5 rounded-[4px]">
          <WifiIcon />
        </button>
        <button className="menu-item-hover h-full flex items-center px-1.5 rounded-[4px]">
          <SpotlightIcon />
        </button>
        <button className="menu-item-hover h-full flex items-center px-1.5 rounded-[4px]">
          <ControlCenterIcon />
        </button>
        <div className="flex items-center h-full px-2 rounded-[4px] menu-item-hover">
          <span className="text-[12.5px] tabular-nums tracking-[-0.01em] text-white/85">
            {dayName} {monthDay}  {clockTime}
          </span>
        </div>
      </div>
    </div>
  )
}

function AppleLogo() {
  return (
    <svg width="13" height="16" viewBox="0 0 14 17" fill="white" className="opacity-90">
      <path d="M13.1 12.04c-.28.63-.61 1.21-1 1.74-.53.71-.96 1.21-1.3 1.48-.52.45-1.07.68-1.67.69-.43 0-.94-.12-1.55-.37-.6-.25-1.16-.37-1.66-.37-.52 0-1.09.12-1.7.37-.61.25-1.1.38-1.47.39-.57.02-1.14-.22-1.7-.72C.74 14.9.4 14.37.13 13.73c-.3-.7-.46-1.44-.46-2.21 0-.82.18-1.53.53-2.13.28-.48.65-.85 1.13-1.12.48-.27.99-.41 1.54-.42.46 0 1.05.14 1.79.43.7.28 1.15.42 1.35.42.15 0 .65-.17 1.49-.5.8-.31 1.47-.44 2.01-.39.74.06 1.3.31 1.67.75-.66.4-1.18.95-1.46 1.63-.25.58-.38 1.22-.38 1.9 0 .7.16 1.32.49 1.87.24.4.56.73.96.97.35.2.74.31 1.16.32.43-.01.91-.14 1.45-.39l-.05-.01zM9.68.44c0 .54-.2 1.04-.59 1.51-.47.56-1.04.88-1.66.84a1.74 1.74 0 01-.02-.22c0-.52.23-1.07.64-1.52.2-.22.46-.4.76-.55.3-.15.59-.23.86-.26.01.07.01.14.01.2z"/>
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="22" height="11" viewBox="0 0 25 12" fill="none" className="opacity-75">
      <rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke="white" strokeOpacity="0.8" strokeWidth="0.8"/>
      <rect x="21.5" y="4" width="2.5" height="4" rx="1" fill="white" fillOpacity="0.4"/>
      <rect x="2" y="2.5" width="15" height="7" rx="1.5" fill="white" fillOpacity="0.85"/>
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 16 12" fill="white" className="opacity-75">
      <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-3.54-2.46a5 5 0 017.08 0l-1.06 1.06a3.5 3.5 0 00-4.96 0L4.46 8.04zm-2.82-2.83a8 8 0 0112.72 0l-1.06 1.06a6.5 6.5 0 00-10.6 0L1.64 5.21z"/>
    </svg>
  )
}

function SpotlightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-75">
      <circle cx="10.5" cy="10.5" r="7.5"/>
      <path d="M20 20l-4-4"/>
    </svg>
  )
}

function ControlCenterIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="white" className="opacity-75">
      <rect x="1" y="0" width="5" height="2.5" rx="1.25" />
      <rect x="8" y="0" width="5" height="2.5" rx="1.25" />
      <rect x="1" y="4.75" width="5" height="2.5" rx="1.25" />
      <rect x="8" y="4.75" width="5" height="2.5" rx="1.25" />
      <rect x="1" y="9.5" width="5" height="2.5" rx="1.25" />
      <rect x="8" y="9.5" width="5" height="2.5" rx="1.25" />
    </svg>
  )
}
