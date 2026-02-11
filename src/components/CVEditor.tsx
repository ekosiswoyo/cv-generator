import { motion } from 'framer-motion';
import { Award, Briefcase, Camera, Code, FileText, GraduationCap, Languages as LangIcon, Layout, Lightbulb, Palette, Plus, Settings2, Share2, Trash2, Type, User } from 'lucide-react';
import React from 'react';
import type { CVData } from '../types';
import { translations } from '../types';

interface CVEditorProps {
  data: CVData;
  updateData: (newData: Partial<CVData>) => void;
}

const fonts = [
  { name: 'Outfit', value: "'Outfit', sans-serif" },
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Roboto', value: "'Roboto', sans-serif" },
  { name: 'Playfair', value: "'Playfair Display', serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Lora', value: "'Lora', serif" },
];

const accentColors = [
  '#6366f1', // Indigo
  '#0ea5e9', // Sky
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#1e293b', // Slate
  '#000000', // Black
];

const templates = [
  { id: 'modern-ats', name: 'Modern ATS', desc: 'Best for HR systems' },
  { id: 'classic-ats', name: 'Classic Formal', desc: 'Traditional & clean' },
  { id: 'minimalist', name: 'Minimalist', desc: 'Modern whitespace' },
  { id: 'creative-sidebar', name: 'Creative Sidebar', desc: 'Bold & organized' },
] as const;

const CVEditor: React.FC<CVEditorProps> = ({ data, updateData }) => {
  const t = translations[data.lang];

  const updatePersonalInfo = (field: string, value: string) => {
    updateData({
      personalInfo: { ...data.personalInfo, [field]: value }
    })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // --- CRUD Functions ---
  const addItem = (key: keyof CVData, newItem: any) => {
    updateData({ [key]: [...(data[key] as any[]), newItem] } as any)
  }

  const updateItem = (key: keyof CVData, index: number, field: string, value: any) => {
    const newList = [...(data[key] as any[])]
    newList[index] = { ...newList[index], [field]: value }
    updateData({ [key]: newList } as any)
  }

  const removeItem = (key: keyof CVData, index: number) => {
    updateData({ [key]: (data[key] as any[]).filter((_, i) => i !== index) } as any)
  }

  // --- Smart Tips Logic ---
  const getTips = () => {
    const tips = [];
    if (data.personalInfo.summary.length < 50) tips.push("Your summary is a bit short. Try to highlight your unique value proposition.");
    if (data.experience.length === 0 && !data.isFreshGraduate) tips.push("Don't forget to add your work experience!");
    if (!data.personalInfo.linkedin) tips.push("Adding a LinkedIn profile can increase your credibility.");
    if (data.skills.length < 3) tips.push("Try adding at least 3-5 core technical skills.");
    return tips;
  }

  if (data.coverLetter.show) {
    return (
      <div className="editor-content">
        <Section title={t.coverLetter} icon={<FileText size={20} />}>
          <div className="glass-card item-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8 }}>Recipient Details</h3>
              <div className="grid-2">
                <Input label="Recipient Name" value={data.coverLetter.recipientName} onChange={(val) => updateData({ coverLetter: { ...data.coverLetter, recipientName: val } })} />
                <Input label="Recipient Title" value={data.coverLetter.recipientTitle} onChange={(val) => updateData({ coverLetter: { ...data.coverLetter, recipientTitle: val } })} />
              </div>
              <div className="grid-2">
                <Input label="Company Name" value={data.coverLetter.companyName} onChange={(val) => updateData({ coverLetter: { ...data.coverLetter, companyName: val } })} />
                <Input label="Company Address" value={data.coverLetter.companyAddress} onChange={(val) => updateData({ coverLetter: { ...data.coverLetter, companyAddress: val } })} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8 }}>Letter Content</h3>
              <Textarea label="Main Body Content" rows={18} value={data.coverLetter.body} onChange={(val) => updateData({ coverLetter: { ...data.coverLetter, body: val } })} />
            </div>
          </div>
        </Section>
        <style>{`.editor-content { padding-bottom: 6rem; }`}</style>
      </div>
    );
  }

  return (
    <div className="editor-content">
      
      {/* 1. Template Selector */}
      <Section title="Templates" icon={<Layout size={20} />}>
        <div className="template-grid">
          {templates.map(tmpl => (
            <button 
              key={tmpl.id} 
              className={`template-card glass-card ${data.template === tmpl.id ? 'active' : ''}`}
              onClick={() => updateData({ template: tmpl.id })}
            >
              <div className="template-thumb">
                <div className={`thumb-preview ${tmpl.id}`}></div>
              </div>
              <div className="template-info">
                <strong>{tmpl.name}</strong>
                <span>{tmpl.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* 2. Design & Career */}
      <Section title={t.design} icon={<Settings2 size={20} />}>
        <div className="settings-grid glass-card">
          <div className="setting-item">
            <label className="setting-label"><Palette size={14} /> Accent Color</label>
            <div className="color-picker">
              {accentColors.map(color => (
                <button
                  key={color}
                  className={`color-swatch-editor ${data.accentColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => updateData({ accentColor: color })}
                />
              ))}
            </div>
          </div>

          <div className="setting-item">
            <label className="setting-label"><Type size={14} /> Typography</label>
            <div className="font-selectors-editor">
              <select value={data.headerFont} onChange={(e) => updateData({ headerFont: e.target.value })}>
                {fonts.map(f => <option key={f.name} value={f.value}>H: {f.name}</option>)}
              </select>
              <select value={data.bodyFont} onChange={(e) => updateData({ bodyFont: e.target.value })}>
                {fonts.map(f => <option key={f.name} value={f.value}>B: {f.name}</option>)}
              </select>
            </div>
          </div>

          <div className="setting-item">
            <label className="setting-label"><GraduationCap size={14} /> {t.career}</label>
            <div className="toggle-container-editor">
              <button className={`toggle-option ${!data.isFreshGraduate ? 'active' : ''}`} onClick={() => updateData({ isFreshGraduate: false })}>Professional</button>
              <button className={`toggle-option ${data.isFreshGraduate ? 'active' : ''}`} onClick={() => updateData({ isFreshGraduate: true })}>Fresh Graduate</button>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Smart Tips */}
      <Section title={t.tips} icon={<Lightbulb size={20} />}>
        <div className="tips-container">
          {getTips().map((tip, i) => (
            <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="tip-box glass-card">
              <span className="tip-dot"></span>
              <p>{tip}</p>
            </motion.div>
          ))}
          {getTips().length === 0 && <p className="success-txt">✨ Your profile looks solid and ready for ATS!</p>}
        </div>
      </Section>

      {/* 4. Personal Info */}
      <Section title="Personal Information" icon={<User size={20} />}>
        <div className="photo-liquid-section">
          <div className="photo-glow-wrap">
            {data.personalInfo.photo ? (
              <div className="photo-circle">
                <img src={data.personalInfo.photo} alt="Profile" />
                <button className="remove-photo-btn" onClick={() => updatePersonalInfo('photo', '')}>×</button>
              </div>
            ) : (
              <div className="photo-placeholder" onClick={() => document.getElementById('photo-input')?.click()}>
                <Camera size={24} />
                <span>Add Photo</span>
              </div>
            )}
          </div>
          <input type="file" accept="image/*" id="photo-input" onChange={handlePhotoChange} style={{ display: 'none' }} />
          <div className="personal-header">
            <h3>Identity Card</h3>
            <p>Ensure your contact info is up to date</p>
          </div>
        </div>

        <div className="grid-2">
          <Input label="Full Name" value={data.personalInfo.fullName} onChange={(val) => updatePersonalInfo('fullName', val)} />
          <Input label="Job Title" value={data.personalInfo.title} onChange={(val) => updatePersonalInfo('title', val)} />
        </div>
        <div className="grid-2">
          <Input label="Email" value={data.personalInfo.email} onChange={(val) => updatePersonalInfo('email', val)} />
          <Input label="Phone" value={data.personalInfo.phone} onChange={(val) => updatePersonalInfo('phone', val)} />
        </div>
        <Input label="Address" value={data.personalInfo.address} onChange={(val) => updatePersonalInfo('address', val)} />
        <div className="grid-2">
          <Input label="LinkedIn URL" value={data.personalInfo.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} />
          <Input label="Website/Portfolio" value={data.personalInfo.website || ''} onChange={(val) => updatePersonalInfo('website', val)} />
        </div>

        <div className="toggle-section-editor">
          <label className="toggle-check">
            <input type="checkbox" checked={data.showQRCode} onChange={(e) => updateData({ showQRCode: e.target.checked })} />
            <span>{t.qrcode}</span>
          </label>
        </div>

        <Textarea label="Professional Summary" value={data.personalInfo.summary} onChange={(val) => updatePersonalInfo('summary', val)} />
      </Section>

      {/* 5. Experience */}
      <Section title={t.experience} icon={<Briefcase size={20} />} onAdd={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })}>
        {data.experience.map((exp, index) => (
          <motion.div key={index} className="glass-card item-card">
            <button className="remove-btn" onClick={() => removeItem('experience', index)}><Trash2 size={16} /></button>
            <div className="grid-2">
              <Input label="Company" value={exp.company} onChange={(val) => updateItem('experience', index, 'company', val)} />
              <Input label="Position" value={exp.position} onChange={(val) => updateItem('experience', index, 'position', val)} />
            </div>
            <div className="grid-2">
              <Input label="Start" value={exp.startDate} onChange={(val) => updateItem('experience', index, 'startDate', val)} />
              <Input label="End" value={exp.endDate} onChange={(val) => updateItem('experience', index, 'endDate', val)} />
            </div>
            <Textarea label="Description" value={exp.description} onChange={(val) => updateItem('experience', index, 'description', val)} />
          </motion.div>
        ))}
      </Section>

      {/* 6. Education */}
      <Section title={t.education} icon={<GraduationCap size={20} />} onAdd={() => addItem('education', { school: '', degree: '', startDate: '', endDate: '', description: '' })}>
        {data.education.map((edu, index) => (
          <motion.div key={index} className="glass-card item-card">
            <button className="remove-btn" onClick={() => removeItem('education', index)}><Trash2 size={16} /></button>
            <div className="grid-2">
              <Input label="School" value={edu.school} onChange={(val) => updateItem('education', index, 'school', val)} />
              <Input label="Degree" value={edu.degree} onChange={(val) => updateItem('education', index, 'degree', val)} />
            </div>
            <div className="grid-2">
              <Input label="Start" value={edu.startDate} onChange={(val) => updateItem('education', index, 'startDate', val)} />
              <Input label="End" value={edu.endDate} onChange={(val) => updateItem('education', index, 'endDate', val)} />
            </div>
          </motion.div>
        ))}
      </Section>

      {/* 7. Skills */}
      <Section title={t.skills} icon={<Code size={20} />} onAdd={() => addItem('skills', { name: '', level: 'Intermediate' })}>
        <div className="skills-grid">
          {data.skills.map((skill, index) => (
            <div key={index} className="skill-liquid-item glass-card">
              <input 
                placeholder="Skill name" 
                value={skill.name} 
                onChange={(e) => updateItem('skills', index, 'name', e.target.value)} 
              />
              <select 
                value={skill.level} 
                onChange={(e) => updateItem('skills', index, 'level', e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <button className="remove-skill" onClick={() => removeItem('skills', index)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Languages */}
      <Section title={t.languages} icon={<LangIcon size={20} />} onAdd={() => addItem('languages', { name: '', level: 'Fluent' })}>
        <div className="skills-grid">
          {data.languages.map((lang, index) => (
            <div key={index} className="skill-liquid-item glass-card">
              <input 
                placeholder="Language" 
                value={lang.name} 
                onChange={(e) => updateItem('languages', index, 'name', e.target.value)} 
              />
              <input 
                placeholder="Level (e.g. Native)" 
                value={lang.level} 
                onChange={(e) => updateItem('languages', index, 'level', e.target.value)} 
              />
              <button className="remove-skill" onClick={() => removeItem('languages', index)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. Certifications */}
      <Section title={t.certifications} icon={<Award size={20} />}>
        <div className="toggle-container glass-card mb-2">
          <label className="toggle-switch">
            <input type="checkbox" checked={data.showCertifications} onChange={(e) => updateData({ showCertifications: e.target.checked })} />
            <span className="slider"></span>
          </label>
          <div className="toggle-label"><strong>Show Certifications</strong></div>
        </div>
        {data.showCertifications && (
          <>
            {data.certifications.map((cert, index) => (
              <div key={index} className="glass-card item-card">
                <button className="remove-btn" onClick={() => removeItem('certifications', index)}><Trash2 size={16} /></button>
                <Input label="Certificate Name" value={cert.name} onChange={(val) => updateItem('certifications', index, 'name', val)} />
                <div className="grid-2">
                  <Input label="Issuer" value={cert.issuer} onChange={(val) => updateItem('certifications', index, 'issuer', val)} />
                  <Input label="Date" value={cert.date} onChange={(val) => updateItem('certifications', index, 'date', val)} />
                </div>
              </div>
            ))}
            <button className="add-btn w-full justify-center" onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })}><Plus size={16} /> Add Certification</button>
          </>
        )}
      </Section>

      {/* 8. Portfolio/Projects */}
      <Section title={t.projects} icon={<Share2 size={20} />}>
        <div className="toggle-container glass-card mb-2">
          <label className="toggle-switch">
            <input type="checkbox" checked={data.showPortfolio} onChange={(e) => updateData({ showPortfolio: e.target.checked })} />
            <span className="slider"></span>
          </label>
          <div className="toggle-label"><strong>Show Portfolio</strong></div>
        </div>
        {data.showPortfolio && (
          <>
            {data.projects.map((proj, index) => (
              <div key={index} className="glass-card item-card">
                <button className="remove-btn" onClick={() => removeItem('projects', index)}><Trash2 size={16} /></button>
                <Input label="Project Name" value={proj.name} onChange={(val) => updateItem('projects', index, 'name', val)} />
                <Input label="Project Link" value={proj.link} onChange={(val) => updateItem('projects', index, 'link', val)} />
                <Textarea label="Description" value={proj.description} onChange={(val) => updateItem('projects', index, 'description', val)} />
              </div>
            ))}
            <button className="add-btn w-full justify-center" onClick={() => addItem('projects', { name: '', link: '', description: '' })}><Plus size={16} /> Add Project</button>
          </>
        )}
      </Section>

      <style>{`
        .template-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .template-card { padding: 10px; text-align: left; cursor: pointer; border: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 8px; transition: all 0.3s; }
        .template-card.active { border-color: var(--primary); box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.3); }
        .template-thumb { height: 100px; background: rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; position: relative; }
        .thumb-preview { width: 100%; height: 100%; background-size: cover; background-position: top; }
        .thumb-preview.modern-ats { background-image: linear-gradient(to bottom, #fff 0%, #fff 30%, #f1f5f9 100%); }
        .thumb-preview.classic-ats { background-image: linear-gradient(to right, #fff 20%, #1e293b 20%, #1e293b 22%, #fff 22%); }
        .thumb-preview.creative-sidebar { background-image: linear-gradient(to right, #6366f1 30%, #fff 30%); }
        
        .template-info strong { display: block; font-size: 0.85rem; color: var(--text-main); }
        .template-info span { font-size: 0.65rem; color: var(--text-muted); }

        .tips-container { display: flex; flex-direction: column; gap: 10px; }
        .tip-box { padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px; background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); }
        .tip-dot { width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; margin-top: 5px; flex-shrink: 0; box-shadow: 0 0 8px #f59e0b; }
        .tip-box p { font-size: 0.8rem; line-height: 1.4; color: var(--text-main); }
        .success-txt { text-align: center; font-size: 0.85rem; color: #10b981; font-weight: 700; padding: 10px; }

        .toggle-section-editor { margin: 15px 0; }
        .toggle-check { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; font-weight: 600; cursor: pointer; user-select: none; }
        .toggle-check input { width: 18px; height: 18px; cursor: pointer; }

        .mb-2 { margin-bottom: 10px; }
        .w-full { width: 100%; }
        .justify-center { justify-content: center; }

        /* Restore essential editor styles */
        .editor-content { padding-bottom: 6rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; gap: 1rem; }
        .section-title { display: flex; align-items: center; gap: 12px; font-size: 1.25rem; font-weight: 700; color: var(--text-main); }
        .add-btn { background: rgba(99, 102, 241, 0.05); color: var(--primary); padding: 8px 16px; border: 1px solid var(--primary); border-radius: 12px; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .item-card { padding: 1rem; margin-bottom: 1.25rem; position: relative; display: flex; flex-direction: column; gap: 0.5rem; }
        .remove-btn { 
          align-self: flex-end;
          background: rgba(239, 68, 68, 0.08); color: #ef4444; 
          padding: 6px 10px; border-radius: 8px; cursor: pointer; border: 1px solid rgba(239, 68, 68, 0.1);
          transition: all 0.2s; font-size: 0.75rem; display: flex; align-items: center; gap: 4px;
        }
        .remove-btn:hover { background: #ef4444; color: white; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2); }
        
        .settings-grid { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
        .setting-item { display: flex; flex-direction: column; gap: 10px; }
        .setting-label { font-size: 0.75rem; font-weight: 700; opacity: 0.6; display: flex; align-items: center; gap: 6px; text-transform: uppercase; }
        
        .color-picker { display: flex; flex-wrap: wrap; gap: 8px; }
        .color-swatch-editor { width: 28px; height: 28px; border-radius: 9px; border: 2.5px solid transparent; cursor: pointer; transition: all 0.2s; }
        .color-swatch-editor.active { border-color: white; transform: scale(1.1); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        
        .font-selectors-editor { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .font-selectors-editor select { padding: 10px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: var(--text-main); font-weight: 600; cursor: pointer; }
        
        .toggle-container-editor { display: flex; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 12px; border: 1px solid var(--glass-border); }
        .toggle-option { flex: 1; padding: 10px; border-radius: 9px; border: none; font-size: 0.8rem; font-weight: 700; cursor: pointer; background: transparent; color: var(--text-main); transition: all 0.2s; }
        .toggle-option.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }

        .photo-liquid-section { display: flex; align-items: center; gap: 20px; margin-bottom: 2rem; background: var(--bg-card); padding: 20px; border-radius: 20px; border: 1px solid var(--glass-border); }
        .photo-glow-wrap { position: relative; }
        .photo-circle { width: 80px; height: 80px; border-radius: 24px; overflow: hidden; border: 3px solid var(--primary); box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
        .photo-circle img { width: 100%; height: 100%; object-fit: cover; }
        .photo-placeholder { width: 80px; height: 80px; border-radius: 24px; border: 2px dashed var(--primary); color: var(--primary); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.7rem; gap: 5px; cursor: pointer; }
        .remove-photo-btn { position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; border: none; }

        .toggle-container { display: flex; align-items: center; gap: 15px; padding: 12px; }
        .toggle-switch { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 24px; border: 1px solid var(--glass-border); }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--primary); border-color: var(--primary); }
        input:checked + .slider:before { transform: translateX(18px); }
        .toggle-label strong { display: block; font-size: 0.8rem; }
        
        .input-group { margin-bottom: 1.25rem; }
        .input-group label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-main); opacity: 0.6; margin-bottom: 8px; text-transform: uppercase; }

        /* Skill & Language modern styles */
        .skills-grid { display: flex; flex-direction: column; gap: 12px; }
        .skill-liquid-item { 
          display: flex; gap: 12px; padding: 12px; align-items: center; 
          background: var(--bg-card); border-radius: 12px; border: 1px solid var(--glass-border);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05); position: relative;
        }
        .skill-liquid-item input { background: rgba(255,255,255,0.05); border: 1px solid var(--border); flex: 2; padding: 8px 12px; height: 40px; border-radius: 8px; color: var(--text-main); }
        .skill-liquid-item select { background: rgba(255,255,255,0.05); border: 1px solid var(--border); flex: 1.2; padding: 0 10px; height: 40px; border-radius: 8px; color: var(--text-main); }
        .remove-skill { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: none; padding: 8px; border-radius: 8px; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .remove-skill:hover { background: #ef4444; color: white; }
        
        @media (max-width: 600px) {
          .grid-2 { grid-template-columns: 1fr; }
          .template-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

const Section: React.FC<{ title: string, icon: React.ReactNode, onAdd?: () => void, children: React.ReactNode }> = ({ title, icon, onAdd, children }) => (
  <motion.section className="editor-section" style={{ marginBottom: '3rem' }}>
    <div className="section-header">
      <h2 className="section-title">{icon} {title}</h2>
      {onAdd && (
        <button className="add-btn" onClick={onAdd}>
          <Plus size={16} /> Add New
        </button>
      )}
    </div>
    {children}
  </motion.section>
)

const Input: React.FC<{ label: string, value: string, onChange: (val: string) => void }> = ({ label, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

const Textarea: React.FC<{ label: string, value: string, onChange: (val: string) => void, rows?: number }> = ({ label, value, onChange, rows = 4 }) => (
  <div className="input-group">
    <label>{label}</label>
    <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

export default CVEditor
