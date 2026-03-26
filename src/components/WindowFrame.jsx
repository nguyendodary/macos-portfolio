import React, { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import useWindowStore from '../stores/windowStore'

export default function WindowFrame({ id, children }) {
  const windowRef = useRef(null)
  const headerRef = useRef(null)
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const isResizing = useRef(false)
  const resizeDir = useRef('')
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0, wx: 0, wy: 0 })

  const windowState = useWindowStore((s) => s.windowStates[id])
  const zIndex = useWindowStore((s) => s.zIndices[id])
  const focusedWindow = useWindowStore((s) => s.focusedWindow)
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const updateWindowPosition = useWindowStore((s) => s.updateWindowPosition)
  const updateWindowSize = useWindowStore((s) => s.updateWindowSize)

  const isFocused = focusedWindow === id

  // Open animation
  useEffect(() => {
    if (windowRef.current) {
      gsap.fromTo(windowRef.current,
        { scale: 0.92, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' }
      )
    }
  }, [])

  // Minimize animation
  useEffect(() => {
    if (windowState?.minimized && windowRef.current) {
      gsap.to(windowRef.current, {
        scale: 0.15,
        opacity: 0,
        y: window.innerHeight - 100,
        duration: 0.4,
        ease: 'power3.in',
      })
    }
  }, [windowState?.minimized])

  // Drag
  const onMouseDown = useCallback((e) => {
    if (e.target.closest('.traffic-light')) return
    focusWindow(id)
    isDragging.current = true
    const rect = windowRef.current.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    document.body.style.cursor = 'grabbing'
    e.preventDefault()
  }, [id, focusWindow])

  // Resize
  const onResizeStart = useCallback((e, dir) => {
    e.stopPropagation()
    e.preventDefault()
    focusWindow(id)
    isResizing.current = true
    resizeDir.current = dir
    const ws = useWindowStore.getState().windowStates[id]
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: ws.width,
      h: ws.height,
      wx: ws.x,
      wy: ws.y,
    }
  }, [id, focusWindow])

  // Global mouse events
  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging.current) {
        const newX = e.clientX - dragOffset.current.x
        const newY = Math.max(28, e.clientY - dragOffset.current.y)
        updateWindowPosition(id, newX, newY)
      }
      if (isResizing.current) {
        const s = resizeStart.current
        const dx = e.clientX - s.x
        const dy = e.clientY - s.y
        const dir = resizeDir.current
        let newW = s.w, newH = s.h, newX = s.wx, newY = s.wy

        if (dir.includes('e')) newW = Math.max(400, s.w + dx)
        if (dir.includes('s')) newH = Math.max(250, s.h + dy)
        if (dir.includes('w')) {
          newW = Math.max(400, s.w - dx)
          newX = s.wx + (s.w - newW)
        }
        if (dir.includes('n')) {
          newH = Math.max(250, s.h - dy)
          newY = Math.max(28, s.wy + (s.h - newH))
        }

        updateWindowSize(id, newW, newH)
        updateWindowPosition(id, newX, newY)
      }
    }

    const onMouseUp = () => {
      isDragging.current = false
      isResizing.current = false
      document.body.style.cursor = ''
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [id, updateWindowPosition, updateWindowSize])

  if (!windowState || windowState.minimized) return null

  return (
    <div
      ref={windowRef}
      className="absolute window-transition overflow-hidden"
      style={{
        left: windowState.x,
        top: windowState.y,
        width: windowState.width,
        height: windowState.height,
        zIndex: zIndex || 100,
        borderRadius: 12,
        boxShadow: isFocused
          ? '0 25px 80px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.1), inset 0 0 0 0.5px rgba(255,255,255,0.05)'
          : '0 12px 40px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.06)',
      }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Title bar */}
      <div
        ref={headerRef}
        className="relative flex items-center h-12 px-4 select-none"
        style={{
          background: isFocused
            ? 'linear-gradient(180deg, rgba(65,65,65,0.98) 0%, rgba(48,48,48,0.98) 100%)'
            : 'linear-gradient(180deg, rgba(58,58,58,0.95) 0%, rgba(45,45,45,0.95) 100%)',
          borderBottom: '0.5px solid rgba(0,0,0,0.4)',
        }}
        onMouseDown={onMouseDown}
        onDoubleClick={() => maximizeWindow(id)}
      >
        {/* Traffic lights */}
        <div className="traffic-lights flex items-center gap-2 z-10">
          <button
            className="traffic-light w-3 h-3 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: isFocused
                ? 'radial-gradient(circle at 35% 35%, #ff8a80, #FF5F57)'
                : 'radial-gradient(circle at 35% 35%, #6b6b6b, #555)',
              boxShadow: isFocused ? 'inset 0 1px 1px rgba(255,255,255,0.2)' : 'none',
            }}
            onClick={(e) => { e.stopPropagation(); closeWindow(id) }}
          >
            <span className="traffic-icon text-[#8b1a1a] text-[8px] font-bold opacity-0 transition-opacity">×</span>
          </button>
          <button
            className="traffic-light w-3 h-3 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: isFocused
                ? 'radial-gradient(circle at 35% 35%, #ffe082, #FEBC2E)'
                : 'radial-gradient(circle at 35% 35%, #6b6b6b, #555)',
              boxShadow: isFocused ? 'inset 0 1px 1px rgba(255,255,255,0.2)' : 'none',
            }}
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }}
          >
            <span className="traffic-icon text-[#8a6a10] text-[11px] font-bold opacity-0 transition-opacity leading-none">−</span>
          </button>
          <button
            className="traffic-light w-3 h-3 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: isFocused
                ? 'radial-gradient(circle at 35% 35%, #a5d6a7, #28C840)'
                : 'radial-gradient(circle at 35% 35%, #6b6b6b, #555)',
              boxShadow: isFocused ? 'inset 0 1px 1px rgba(255,255,255,0.2)' : 'none',
            }}
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id) }}
          >
            <span className="traffic-icon text-[#146320] text-[8px] font-bold opacity-0 transition-opacity">↗</span>
          </button>
        </div>

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-[13px] font-medium tracking-tight transition-colors ${isFocused ? 'text-white/85' : 'text-white/35'}`}>
            {windowState.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="overflow-hidden"
        style={{
          height: windowState.height - 48,
          background: '#1e1e1e',
        }}
      >
        {children}
      </div>

      {/* Resize handles */}
      <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-20" onMouseDown={(e) => onResizeStart(e, 'ne')} />
      <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-20" onMouseDown={(e) => onResizeStart(e, 'nw')} />
      <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-20" onMouseDown={(e) => onResizeStart(e, 'se')} />
      <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-20" onMouseDown={(e) => onResizeStart(e, 'sw')} />
      <div className="absolute top-0 left-4 right-4 h-1 cursor-n-resize z-20" onMouseDown={(e) => onResizeStart(e, 'n')} />
      <div className="absolute bottom-0 left-4 right-4 h-1 cursor-s-resize z-20" onMouseDown={(e) => onResizeStart(e, 's')} />
      <div className="absolute left-0 top-4 bottom-4 w-1 cursor-w-resize z-20" onMouseDown={(e) => onResizeStart(e, 'w')} />
      <div className="absolute right-0 top-4 bottom-4 w-1 cursor-e-resize z-20" onMouseDown={(e) => onResizeStart(e, 'e')} />
    </div>
  )
}
