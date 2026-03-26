import React from 'react'
import useWindowStore from './stores/windowStore'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import Desktop from './components/Desktop'
import WindowFrame from './components/WindowFrame'
import SafariApp from './components/apps/SafariApp'
import FinderApp from './components/apps/FinderApp'

const APP_MAP = {
  safari: SafariApp,
  finder: FinderApp,
}

export default function App() {
  const openWindows = useWindowStore((s) => s.openWindows)

  return (
    <div className="w-full h-full overflow-hidden relative font-sf">
      <MenuBar />
      <Desktop>
        {openWindows.map((windowId) => {
          const AppContent = APP_MAP[windowId]
          if (!AppContent) return null
          return (
            <WindowFrame key={windowId} id={windowId}>
              <AppContent />
            </WindowFrame>
          )
        })}
      </Desktop>
      <Dock />
    </div>
  )
}
