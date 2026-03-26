import React, { useState } from 'react'
import useWindowStore from '../../stores/windowStore'

const SIDEBAR_ITEMS = [
  { section: 'Favorites', items: [
    { name: 'Recents', icon: '🕐' },
    { name: 'Applications', icon: '📱' },
    { name: 'Desktop', icon: '🖥️' },
    { name: 'Documents', icon: '📄' },
    { name: 'Downloads', icon: '⬇️' },
  ]},
  { section: 'iCloud', items: [
    { name: 'iCloud Drive', icon: '☁️' },
  ]},
  { section: 'Locations', items: [
    { name: 'Macintosh HD', icon: '💾' },
  ]},
]

const FILES = {
  'Recents': [
    { name: 'index.html', type: 'file', size: '2.4 KB', modified: 'Today' },
    { name: 'package.json', type: 'file', size: '1.2 KB', modified: 'Today' },
    { name: 'App.jsx', type: 'file', size: '4.8 KB', modified: 'Today' },
    { name: 'components/', type: 'folder', size: '--', modified: 'Today' },
  ],
  'Applications': [
    { name: 'Safari.app', type: 'app', size: '24 MB', modified: 'Mar 15' },
    { name: 'Finder.app', type: 'app', size: '18 MB', modified: 'Mar 15' },
    { name: 'Terminal.app', type: 'app', size: '12 MB', modified: 'Mar 15' },
    { name: 'Notes.app', type: 'app', size: '15 MB', modified: 'Mar 15' },
    { name: 'System Settings.app', type: 'app', size: '22 MB', modified: 'Mar 15' },
  ],
  'Desktop': [
    { name: 'Projects/', type: 'folder', size: '--', modified: 'Mar 20' },
    { name: 'Resume.pdf', type: 'pdf', size: '245 KB', modified: 'Mar 18' },
    { name: 'Notes.txt', type: 'text', size: '4 KB', modified: 'Mar 10' },
    { name: 'Screenshot 2025-03-01.png', type: 'image', size: '2.1 MB', modified: 'Mar 1' },
  ],
  'Documents': [
    { name: 'Contracts/', type: 'folder', size: '--', modified: 'Feb 28' },
    { name: 'Invoice-Feb.pdf', type: 'pdf', size: '120 KB', modified: 'Feb 25' },
    { name: 'cover-letter.docx', type: 'doc', size: '35 KB', modified: 'Feb 20' },
    { name: 'tax-2024.xlsx', type: 'spreadsheet', size: '89 KB', modified: 'Feb 15' },
  ],
  'Downloads': [
    { name: 'node-v20.11.0.pkg', type: 'file', size: '45 MB', modified: 'Today' },
    { name: 'figma-export.zip', type: 'archive', size: '12 MB', modified: 'Yesterday' },
    { name: 'portfolio-assets/', type: 'folder', size: '--', modified: 'Mar 15' },
    { name: 'reference-design.fig', type: 'file', size: '8 MB', modified: 'Mar 10' },
  ],
}

const FILE_ICONS = {
  folder: '📁',
  pdf: '📕',
  doc: '📘',
  text: '📝',
  image: '🖼️',
  app: '📱',
  spreadsheet: '📗',
  archive: '📦',
  file: '📄',
}

export default function FinderApp() {
  const focusedWindow = useWindowStore((s) => s.focusedWindow)
  const isFocused = focusedWindow === 'finder'
  const [activeSection, setActiveSection] = useState('Desktop')
  const [selectedFile, setSelectedFile] = useState(null)

  const files = FILES[activeSection] || []

  return (
    <div className="flex h-full" style={{ background: '#1e1e1e' }}>
      {/* Sidebar */}
      <div
        className="w-[180px] flex-shrink-0 border-r border-white/5 py-2 overflow-auto"
        style={{
          background: isFocused ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.1)',
        }}
      >
        {SIDEBAR_ITEMS.map((section) => (
          <div key={section.section} className="mb-2">
            <div className="px-4 py-1 text-[10px] font-semibold text-white/30 uppercase tracking-wider">
              {section.section}
            </div>
            {section.items.map((item) => (
              <button
                key={item.name}
                onClick={() => { setActiveSection(item.name); setSelectedFile(null) }}
                className={`w-full text-left px-4 py-[3px] flex items-center gap-2 text-[12px] rounded-md mx-2 transition-colors ${
                  activeSection === item.name
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-white/60 hover:bg-white/5'
                }`}
                style={{ width: 'calc(100% - 16px)' }}
              >
                <span className="text-[13px]">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-[7px] border-b"
          style={{ background: '#2a2a2a', borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-[6px]">
            <button className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-white/30 hover:bg-white/[0.07] text-[13px] transition-all">
              ‹
            </button>
            <button className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-white/30 hover:bg-white/[0.07] text-[13px] transition-all">
              ›
            </button>
          </div>
          <span className="text-[13px] font-medium text-white/60 ml-1">{activeSection}</span>
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <button className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-white/30 hover:bg-white/[0.07] transition-all">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1.5"/><rect x="10" y="0" width="6" height="6" rx="1.5"/><rect x="0" y="10" width="6" height="6" rx="1.5"/><rect x="10" y="10" width="6" height="6" rx="1.5"/></svg>
            </button>
            <button className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-white/30 hover:bg-white/[0.07] transition-all">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="2" rx="1"/><rect x="0" y="7" width="16" height="2" rx="1"/><rect x="0" y="13" width="16" height="2" rx="1"/></svg>
            </button>
          </div>
          <div
            className="w-[160px] h-[26px] rounded-[7px] flex items-center px-2 text-[11px] text-white/25 gap-1"
            style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.05)' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            Search
          </div>
        </div>

        {/* File list header */}
        <div
          className="flex items-center px-4 py-[5px] border-b text-[10px] text-white/30 uppercase tracking-wider"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <span className="flex-1">Name</span>
          <span className="w-[80px] text-right">Size</span>
          <span className="w-[100px] text-right">Date Modified</span>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-auto">
          {files.map((file, i) => (
            <div
              key={i}
              className={`flex items-center px-4 py-[5px] cursor-default transition-colors border-b ${
                selectedFile === i ? 'bg-blue-500/20' : 'hover:bg-white/[0.04]'
              }`}
              style={{ borderColor: 'rgba(255,255,255,0.02)' }}
              onClick={() => setSelectedFile(i)}
            >
              <span className="flex-1 flex items-center gap-2 text-[12px] text-white/80">
                <span className="text-[14px]">{FILE_ICONS[file.type] || '📄'}</span>
                {file.name}
              </span>
              <span className="w-[80px] text-right text-[11px] text-white/30">{file.size}</span>
              <span className="w-[100px] text-right text-[11px] text-white/30">{file.modified}</span>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-[5px] border-t text-[11px] text-white/25"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <span>{files.length} items</span>
          <span>{selectedFile !== null ? `Selected: ${files[selectedFile]?.name}` : 'Available: 234 GB'}</span>
        </div>
      </div>
    </div>
  )
}
