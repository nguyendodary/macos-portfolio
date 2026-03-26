import { create } from 'zustand'

const WINDOW_DEFAULTS = {
  safari: { width: 900, height: 560, title: 'Safari' },
  finder: { width: 780, height: 480, title: 'Finder' },
  notes: { width: 520, height: 400, title: 'Notes' },
  terminal: { width: 620, height: 400, title: 'Terminal' },
  settings: { width: 680, height: 480, title: 'System Settings' },
}

let zIndexCounter = 100

const useWindowStore = create((set, get) => ({
  openWindows: [],
  focusedWindow: null,
  windowStates: {},
  zIndices: {},

  openWindow: (id) => {
    const state = get()
    if (state.openWindows.includes(id)) {
      const ws = state.windowStates[id]
      if (ws?.minimized) {
        get().restoreWindow(id)
      } else {
        get().focusWindow(id)
      }
      return
    }

    const defaults = WINDOW_DEFAULTS[id] || { width: 700, height: 500, title: id }
    const offset = state.openWindows.length * 28
    const centerX = Math.max(40, (window.innerWidth - defaults.width) / 2 + offset)
    const centerY = Math.max(40, (window.innerHeight - defaults.height - 100) / 2 + offset)

    zIndexCounter += 1

    set((s) => ({
      openWindows: [...s.openWindows, id],
      focusedWindow: id,
      windowStates: {
        ...s.windowStates,
        [id]: {
          x: centerX,
          y: centerY,
          width: defaults.width,
          height: defaults.height,
          minimized: false,
          maximized: false,
          title: defaults.title,
          prevBounds: null,
        },
      },
      zIndices: { ...s.zIndices, [id]: zIndexCounter },
    }))
  },

  closeWindow: (id) => {
    set((s) => {
      const remaining = s.openWindows.filter((w) => w !== id)
      const newStates = { ...s.windowStates }
      const newZ = { ...s.zIndices }
      delete newStates[id]
      delete newZ[id]
      return {
        openWindows: remaining,
        focusedWindow: remaining.length > 0 ? remaining[remaining.length - 1] : null,
        windowStates: newStates,
        zIndices: newZ,
      }
    })
  },

  focusWindow: (id) => {
    zIndexCounter += 1
    set((s) => ({
      focusedWindow: id,
      zIndices: { ...s.zIndices, [id]: zIndexCounter },
    }))
  },

  minimizeWindow: (id) => {
    set((s) => {
      const remaining = s.openWindows.filter(
        (w) => w !== id || !s.windowStates[w]?.minimized
      )
      return {
        windowStates: {
          ...s.windowStates,
          [id]: { ...s.windowStates[id], minimized: true },
        },
        focusedWindow: s.openWindows.find(
          (w) => w !== id && !s.windowStates[w]?.minimized
        ) || null,
      }
    })
  },

  maximizeWindow: (id) => {
    const ws = get().windowStates[id]
    if (!ws) return
    if (ws.maximized) {
      set((s) => ({
        windowStates: {
          ...s.windowStates,
          [id]: {
            ...ws.prevBounds,
            minimized: false,
            maximized: false,
            prevBounds: null,
          },
        },
      }))
    } else {
      set((s) => ({
        windowStates: {
          ...s.windowStates,
          [id]: {
            ...ws,
            x: 0,
            y: 28,
            width: window.innerWidth,
            height: window.innerHeight - 28 - 85,
            minimized: false,
            maximized: true,
            prevBounds: { x: ws.x, y: ws.y, width: ws.width, height: ws.height },
          },
        },
      }))
    }
    get().focusWindow(id)
  },

  restoreWindow: (id) => {
    set((s) => ({
      windowStates: {
        ...s.windowStates,
        [id]: { ...s.windowStates[id], minimized: false },
      },
    }))
    get().focusWindow(id)
  },

  updateWindowPosition: (id, x, y) => {
    set((s) => ({
      windowStates: {
        ...s.windowStates,
        [id]: { ...s.windowStates[id], x, y, maximized: false },
      },
    }))
  },

  updateWindowSize: (id, width, height) => {
    set((s) => ({
      windowStates: {
        ...s.windowStates,
        [id]: {
          ...s.windowStates[id],
          width: Math.max(400, width),
          height: Math.max(250, height),
          maximized: false,
        },
      },
    }))
  },
}))

export default useWindowStore
