import React from 'react'
import useWindowStore from '../../stores/windowStore'

const PROJECTS = [
  {
    title: 'AI Chat Platform',
    description: 'Real-time chat with AI-powered responses, built with React, Node.js, and OpenAI API.',
    tags: ['React', 'Node.js', 'OpenAI', 'WebSocket'],
    color: '#8B5CF6',
    icon: '🤖',
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'Full-stack analytics dashboard for online stores with real-time sales tracking.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'D3.js'],
    color: '#10B981',
    icon: '📊',
  },
  {
    title: '3D Product Configurator',
    description: 'Interactive 3D product customization tool using Three.js with real-time rendering.',
    tags: ['React', 'Three.js', 'WebGL', 'GSAP'],
    color: '#F59E0B',
    icon: '🎨',
  },
  {
    title: 'Developer Portfolio',
    description: 'This very portfolio — a macOS-inspired desktop experience built with React and GSAP.',
    tags: ['React', 'GSAP', 'Zustand', 'Tailwind'],
    color: '#3B82F6',
    icon: '💻',
  },
  {
    title: 'Task Management App',
    description: 'Kanban-style project management tool with drag-and-drop and real-time collaboration.',
    tags: ['Vue.js', 'Firebase', 'DnD Kit'],
    color: '#EC4899',
    icon: '✅',
  },
  {
    title: 'Weather Visualization',
    description: 'Beautiful weather dashboard with animated backgrounds based on real-time weather data.',
    tags: ['React', 'Framer Motion', 'Weather API'],
    color: '#06B6D4',
    icon: '🌤️',
  },
]

export default function SafariApp() {
  const focusedWindow = useWindowStore((s) => s.focusedWindow)
  const isFocused = focusedWindow === 'safari'

  return (
    <div className="flex flex-col h-full" style={{ background: '#1e1e1e' }}>
      {/* Toolbar / Address bar */}
      <div
        className="flex items-center gap-3 px-4 py-[7px] border-b"
        style={{
          background: isFocused ? '#2d2d2d' : '#252525',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-[6px]">
          <button className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-white/35 hover:bg-white/[0.07] text-[13px] transition-all">
            ‹
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-white/35 hover:bg-white/[0.07] text-[13px] transition-all">
            ›
          </button>
        </div>
        <div
          className="flex-1 h-[28px] rounded-[7px] flex items-center justify-center text-[12px] text-white/40 gap-[6px]"
          style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.05)' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          portfolio.dev
        </div>
        <button className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-white/35 hover:bg-white/[0.07] text-[15px] transition-all">
          +
        </button>
      </div>

      {/* Tab bar */}
      <div
        className="flex items-center px-2 border-b"
        style={{ background: '#262626', borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div className="flex items-center bg-[#1e1e1e] rounded-t-[8px] px-3 py-[5px] text-[11.5px] text-white/75 border-t-[2px] border-blue-500 gap-2">
          <span className="text-[10px]">🌐</span>
          <span>Portfolio</span>
          <span className="text-white/20 hover:text-white/50 cursor-pointer ml-1 text-[13px]">×</span>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
        <div className="max-w-[700px] mx-auto px-8 py-8">
          {/* Hero section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-500/20">
                A
              </div>
              <div>
                <h1 className="text-[22px] font-bold text-white/95 tracking-tight">Alex Chen</h1>
                <p className="text-[12px] text-white/40">Full-Stack Developer · San Francisco</p>
              </div>
            </div>
            <p className="text-[13px] text-white/45 leading-relaxed">
              I build polished web experiences — from interactive dashboards to creative
              developer tools. Focused on performance, animation, and the little details
              that make interfaces feel alive.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Projects', value: '12+' },
              { label: 'Years', value: '5' },
              { label: 'Clients', value: '20+' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl py-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.06)' }}
              >
                <div className="text-[20px] font-bold text-white/90">{s.value}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <h2 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">Skills</h2>
          <div className="flex flex-wrap gap-[6px] mb-8">
            {['React', 'TypeScript', 'Node.js', 'Python', 'Three.js', 'GSAP', 'Tailwind', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'].map((s) => (
              <span
                key={s}
                className="px-[10px] py-[4px] rounded-[8px] text-[11.5px] font-medium text-white/55"
                style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.05)' }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Projects */}
          <h2 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">Projects</h2>
          <div className="grid grid-cols-2 gap-3">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="rounded-[14px] overflow-hidden cursor-default transition-all duration-200 hover:scale-[1.015]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '0.5px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="h-[3px]" style={{ background: p.color }} />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[18px]">{p.icon}</span>
                    <h3 className="text-[13.5px] font-semibold text-white/85">{p.title}</h3>
                  </div>
                  <p className="text-[11.5px] text-white/35 leading-[1.5] mb-3">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-[6px] py-[2px] rounded-[5px] text-[10px] text-white/35"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 mb-4">
            <h2 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">Get in Touch</h2>
            <div
              className="rounded-[14px] p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[12px] text-white/40 mb-4">
                Open to freelance projects and full-time opportunities. Let's build something great together.
              </p>
              <div className="flex gap-2">
                {['GitHub', 'LinkedIn', 'Email', 'Resume'].map((label) => (
                  <span
                    key={label}
                    className="px-3 py-[6px] rounded-[8px] text-[11.5px] font-medium text-blue-400 cursor-pointer transition-all hover:bg-blue-500/20"
                    style={{ background: 'rgba(59,130,246,0.1)', border: '0.5px solid rgba(59,130,246,0.15)' }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
