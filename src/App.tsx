import { motion } from 'framer-motion'
import { Download, Layout as LayoutIcon, Moon, Save, Sun, Upload } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import './App.css'
import CVEditor from './components/CVEditor'
import CVPreview from './components/CVPreview.tsx'
import type { CVData } from './types'
import { defaultCVData, translations } from './types'

function App() {
  const [data, setData] = useState<CVData>(defaultCVData)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const componentRef = useRef<HTMLDivElement>(null)

  const t = translations[data.lang]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.personalInfo.fullName.replace(/\s+/g, '_')}_${data.personalInfo.title.replace(/\s+/g, '_')}_${new Date().getFullYear()}`,
  })

  const updateData = (newData: Partial<CVData>) => {
    setData(prev => ({ ...prev, ...newData }))
  }

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  const exportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalInfo.fullName.replace(/\s+/g, '_')}_data.json`;
    link.click();
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target?.result as string);
          setData(importedData);
        } catch (err) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div 
      className="app-container"
      style={{ '--primary': data.accentColor } as React.CSSProperties}
    >
      <header className="app-header glass no-print">
        <div className="logo-section">
          <motion.div whileHover={{ scale: 1.1 }} className="icon-circle">
            <LayoutIcon size={24} color="white" />
          </motion.div>
          <div className="logo-text">
            <h1>{t.appTitle}</h1>
            <p className="hide-mobile">{t.appDesc}</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="lang-selector">
            <select 
              value={data.lang} 
              onChange={(e) => updateData({ lang: e.target.value as 'en' | 'id' })}
            >
              <option value="en">EN</option>
              <option value="id">ID</option>
            </select>
          </div>

          <div className="action-btns">
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="icon-btn hide-mobile" onClick={exportJSON} title="Export Data (JSON)">
              <Save size={18} />
            </button>
            <label className="icon-btn hide-mobile" title="Import Data (JSON)">
              <Upload size={18} />
              <input type="file" accept=".json" onChange={importJSON} style={{ display: 'none' }} />
            </label>
            <button className="download-btn primary" onClick={() => handlePrint()}>
              <Download size={18} />
              <span className="hide-mobile">PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className={`editor-side ${activeTab === 'edit' ? 'active' : ''}`}>
          <CVEditor data={data} updateData={updateData} />
        </div>
        
        <div className={`preview-side ${activeTab === 'preview' ? 'active' : ''}`}>
          <div className="preview-wrap">
            <div className="preview-container glass">
              <CVPreview ref={componentRef} data={data} />
            </div>
          </div>
        </div>
      </main>

      <nav className="mobile-nav no-print">
        <button className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>Editor</button>
        <button className={activeTab === 'preview' ? 'active' : ''} onClick={() => setActiveTab('preview')}>Preview</button>
      </nav>

      <style>{`
        .app-container { display: flex; flex-direction: column; height: 100vh; width: 100%; overflow: hidden; background: var(--liquid-bg); background-attachment: fixed; }
        .app-header { display: flex; justify-content: space-between; align-items: center; padding: 0 1.5rem; z-index: 100; height: 70px; margin: 1rem 1rem 0 1rem; border-radius: 18px; gap: 1rem; }
        .logo-section { display: flex; align-items: center; gap: 12px; }
        .icon-circle { background: var(--primary); padding: 8px; border-radius: 10px; display: flex; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }
        .logo-text h1 { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.5px; line-height: 1; }
        .logo-text p { font-size: 0.55rem; opacity: 0.6; text-transform: uppercase; font-weight: 700; margin-top: 4px; }
        
        .header-actions { display: flex; align-items: center; gap: 12px; }
        .lang-selector select { 
          height: 32px; padding: 0 8px; font-size: 0.75rem; font-weight: 700; border-radius: 8px; 
          background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: var(--text-main); 
          cursor: pointer; outline: none;
        }

        .action-btns { display: flex; align-items: center; gap: 8px; }
        .icon-btn { 
          background: rgba(255, 255, 255, 0.04); color: var(--text-main); width: 32px; height: 32px; 
          display: flex; align-items: center; justify-content: center; border-radius: 8px; 
          border: 1px solid var(--glass-border); cursor: pointer; transition: all 0.2s;
        }
        .icon-btn:hover { background: rgba(255,255,255,0.1); border-color: var(--primary); }
        
        .download-btn { 
          display: flex; align-items: center; gap: 6px; padding: 0 12px; height: 32px; 
          font-size: 0.75rem; font-weight: 800; border-radius: 8px; background: var(--primary); 
          color: white; box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
        }
        .download-btn:hover { transform: translateY(-3px); filter: brightness(1.1); box-shadow: 0 8px 20px rgba(var(--primary-rgb, 99, 102, 241), 0.5); }
        
        .app-main { display: flex; flex: 1; overflow: hidden; padding: 1rem; gap: 1rem; }
        .editor-side { width: 450px; overflow-y: auto; padding-right: 5px; }
        .preview-side { flex: 1; overflow-y: auto; display: flex; justify-content: center; align-items: flex-start; padding: 1rem; }
        .preview-wrap { width: 100%; max-width: 210mm; padding-bottom: 5rem; }
        .preview-container { background: white; border-radius: 4px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); overflow: hidden; }
        
        .mobile-nav { display: none; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--bg-sidebar); backdrop-filter: blur(20px); padding: 5px; border-radius: 50px; border: 1px solid var(--glass-border); box-shadow: 0 10px 40px rgba(0,0,0,0.3); z-index: 1000; }
        .mobile-nav button { padding: 10px 25px; border-radius: 25px; color: var(--text-main); background: transparent; font-size: 0.85rem; font-weight: 600; }
        .mobile-nav button.active { background: var(--primary); color: white; }

        @media (max-width: 1024px) { 
          .hide-mobile { display: none; } 
          .app-header { height: 60px; padding: 0 1rem; margin: 0.5rem; border-radius: 12px; }
          .logo-section { gap: 8px; }
          .icon-circle { padding: 6px; }
          .icon-circle svg { width: 18px; height: 18px; }
          .logo-text h1 { font-size: 1rem; }
          
          .editor-side { width: 100%; display: none; } 
          .preview-side { display: none; } 
          .editor-side.active, .preview-side.active { display: flex; flex-direction: column; justify-content: flex-start; align-items: center; } 
          .mobile-nav { display: flex; } 
          
          .preview-wrap { padding: 0; transform: scale(0.95); transform-origin: top center; margin-bottom: 80px; }
        }
      `}</style>
    </div>
  )
}

export default App
