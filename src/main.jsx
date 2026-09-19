import React, { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Atom, ChevronDown, Clapperboard, Folder, Image, Library,
  Menu, Mic, PanelLeft, Paperclip, PencilLine, Plus, Search, Send,
  Sparkles, SquareSplitHorizontal, UserRound, Video, X
} from 'lucide-react'
import './styles.css'

const logo = 'https://aiashokrav1-ten.vercel.app/assets/ai-ashokra-logo.png'

const navItems = [
  { label: 'New Chat', icon: PencilLine, active: true },
  { label: 'Video Studio', icon: Clapperboard, badge: 'PRO' },
  { label: 'Slides', icon: SquareSplitHorizontal },
  { label: 'Experts', icon: UserRound },
  { label: 'Projects', icon: Folder },
  { label: 'Library', icon: Library },
]

const tools = [
  { label: 'Videos', icon: Video },
  { label: 'Slides', icon: SquareSplitHorizontal },
  { label: 'Images', icon: Image },
  { label: 'Compare', icon: SquareSplitHorizontal },
  { label: 'Deep Research', icon: Atom },
]

const attachmentTools = [
  { label: 'Attach Files', icon: Paperclip },
  { label: 'Web Search', icon: Search },
  { label: 'Compare', icon: SquareSplitHorizontal },
  { label: 'Deep Research', icon: Atom },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [modelOpen, setModelOpen] = useState(false)
  const [attachmentOpen, setAttachmentOpen] = useState(false)
  const [model, setModel] = useState('Auto')
  const [selectedTool, setSelectedTool] = useState(null)
  const fileInputRef = useRef(null)

  const submit = (event) => {
    event.preventDefault()
    if (!prompt.trim()) return
    setPrompt('')
  }

  const openFilePicker = () => {
    const input = fileInputRef.current
    if (!input) return

    // showPicker keeps the action tied to the menu click on supported browsers;
    // click() provides the fallback used by Safari and older mobile browsers.
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker()
      } catch {
        input.click()
      }
    } else {
      input.click()
    }
    setAttachmentOpen(false)
  }

  const handleFilesSelected = (event) => {
    event.target.value = ''
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="brand-row">
          <img className="brand-logo" src={logo} alt="AI Ashokra logo" />
          <span className="brand-name">AI Ashokra</span>
          <div className="brand-actions">
            <button aria-label="Search"><Search size={22} /></button>
            <button aria-label="Collapse sidebar" onClick={() => setSidebarOpen(false)}><PanelLeft size={21} /></button>
          </div>
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, active, badge }) => (
            <button className={`nav-item ${active ? 'active' : ''}`} key={label}>
              <Icon size={21} strokeWidth={1.7} />
              <span>{label}</span>
              {badge && <small>{badge}</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="profile-card">
            <span className="avatar">F</span>
            <span className="profile-copy"><strong>Fitforlifevitthal</strong><em>Free</em></span>
            <ChevronDown size={17} />
          </button>
        </div>
      </aside>
      {sidebarOpen && <button className="backdrop" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />}
      <main className="main-content">
        <button className="mobile-menu" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}><Menu size={23} /></button>
        <section className="hero">
          <div className="hero-glow" />
          <h1>Hi Fitforlifevitthal, how can I help you<br className="desktop-break" /> today?</h1>
          <form className="composer" onSubmit={submit}>
            <div className="attachment-wrap">
              <button type="button" className={`icon-button ${attachmentOpen ? 'is-open' : ''}`} aria-label={attachmentOpen ? 'Close attachment menu' : 'Add attachment'} aria-expanded={attachmentOpen} onClick={() => setAttachmentOpen((isOpen) => !isOpen)}>
                <span className="attachment-icon" aria-hidden="true"><Plus className="plus-icon" size={25} /><X className="close-icon" size={25} /></span>
              </button>
              {attachmentOpen && (
                <div className="attachment-menu" role="menu">
                  {attachmentTools.map(({ label, icon: Icon }) => (
                    <button type="button" role="menuitem" className="attachment-item" key={label} onClick={label === 'Attach Files' ? openFilePicker : () => setAttachmentOpen(false)}>
                      <Icon size={23} strokeWidth={1.8} /><span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input ref={fileInputRef} className="file-input" type="file" accept="image/*,.pdf,.doc,.docx,.txt" multiple onChange={handleFilesSelected} tabIndex="-1" aria-label="Choose files to attach" />
            <input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="What would you like to create?" aria-label="Prompt" />
            <div className="composer-actions">
              <div className="model-wrap">
                <button type="button" className="model-button" onClick={() => setModelOpen((isOpen) => !isOpen)}>{model}<ChevronDown size={15} /></button>
                {modelOpen && <div className="model-menu">{['Auto', 'Fast', 'Reasoning'].map((option) => <button type="button" key={option} onClick={() => { setModel(option); setModelOpen(false) }}>{option}</button>)}</div>}
              </div>
              <button type="button" className="mic-button" aria-label="Voice input"><Mic size={22} /></button>
              {prompt && <button type="submit" className="send-button" aria-label="Send prompt"><Send size={17} /></button>}
            </div>
          </form>
          <div className="quick-tools">{tools.map(({ label, icon: Icon }) => <button key={label} className={selectedTool === label ? 'selected' : ''} onClick={() => setSelectedTool(label)}><Icon size={20} strokeWidth={1.8} /><span>{label}</span></button>)}</div>
          <p className="privacy-note"><Sparkles size={13} /> AI Ashokra can make mistakes. Check important information.</p>
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
