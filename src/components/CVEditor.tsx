import { motion } from 'framer-motion';
import { Briefcase, Camera, Code, GraduationCap, Palette, Plus, Settings2, Trash2, Type, User } from 'lucide-react';
import React from 'react';
import type { CVData, Education, Experience, Project, Skill } from '../types';
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

  const addExperience = () => {
    const newExp: Experience = { company: '', position: '', startDate: '', endDate: '', description: '' }
    updateData({ experience: [...data.experience, newExp] })
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExp = [...data.experience]
    newExp[index] = { ...newExp[index], [field]: value }
    updateData({ experience: newExp })
  }

  const removeExperience = (index: number) => {
    updateData({ experience: data.experience.filter((_, i) => i !== index) })
  }

  const addEducation = () => {
    const newEdu: Education = { school: '', degree: '', startDate: '', endDate: '', description: '' }
    updateData({ education: [...data.education, newEdu] })
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEdu = [...data.education]
    newEdu[index] = { ...newEdu[index], [field]: value }
    updateData({ education: newEdu })
  }

  const removeEducation = (index: number) => {
    updateData({ education: data.education.filter((_, i) => i !== index) })
  }

  const addSkill = () => {
    const newSkill: Skill = { name: '', level: 'Beginner' }
    updateData({ skills: [...data.skills, newSkill] })
  }

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...data.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    updateData({ skills: newSkills })
  }

  const removeSkill = (index: number) => {
    updateData({ skills: data.skills.filter((_, i) => i !== index) })
  }

  const addProject = () => {
    updateData({ projects: [...data.projects, { name: '', link: '', description: '' }] })
  }

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...data.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    updateData({ projects: newProjects })
  }

  const removeProject = (index: number) => {
    updateData({ projects: data.projects.filter((_, i) => i !== index) })
  }

  return (
    <div className="editor-content">
      
      {/* Design & Career Settings Section */}
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
              <select 
                value={data.headerFont} 
                onChange={(e) => updateData({ headerFont: e.target.value })}
              >
                {fonts.map(f => <option key={f.name} value={f.value}>H: {f.name}</option>)}
              </select>
              <select 
                value={data.bodyFont} 
                onChange={(e) => updateData({ bodyFont: e.target.value })}
              >
                {fonts.map(f => <option key={f.name} value={f.value}>B: {f.name}</option>)}
              </select>
            </div>
          </div>

          <div className="setting-item">
            <label className="setting-label"><GraduationCap size={14} /> {t.career}</label>
            <div className="toggle-container-editor">
              <button 
                className={`toggle-option ${!data.isFreshGraduate ? 'active' : ''}`}
                onClick={() => updateData({ isFreshGraduate: false })}
              >
                Professional
              </button>
              <button 
                className={`toggle-option ${data.isFreshGraduate ? 'active' : ''}`}
                onClick={() => updateData({ isFreshGraduate: true })}
              >
                Fresh Graduate
              </button>
            </div>
          </div>
        </div>
      </Section>

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
          <input 
            type="file" 
            accept="image/*" 
            id="photo-input" 
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <div className="personal-header">
            <h3>Identity Card</h3>
            <p>Fill in your basic information</p>
          </div>
        </div>

        <div className="grid-2">
          <Input label="Full Name" value={data.personalInfo.fullName} onChange={(val: string) => updatePersonalInfo('fullName', val)} />
          <Input label="Job Title" value={data.personalInfo.title} onChange={(val: string) => updatePersonalInfo('title', val)} />
        </div>
        <div className="grid-2">
          <Input label="Email" value={data.personalInfo.email} onChange={(val: string) => updatePersonalInfo('email', val)} />
          <Input label="Phone" value={data.personalInfo.phone} onChange={(val: string) => updatePersonalInfo('phone', val)} />
        </div>
        <Input label="Address" value={data.personalInfo.address} onChange={(val: string) => updatePersonalInfo('address', val)} />
        <Textarea label="Professional Summary" value={data.personalInfo.summary} onChange={(val: string) => updatePersonalInfo('summary', val)} />
      </Section>

      <Section title={t.experience} icon={<Briefcase size={20} />} onAdd={addExperience}>
        {data.experience.map((exp, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card item-card"
          >
            <button className="remove-btn" onClick={() => removeExperience(index)}><Trash2 size={16} /></button>
            <div className="grid-2">
              <Input label="Company" value={exp.company} onChange={(val: string) => updateExperience(index, 'company', val)} />
              <Input label="Position" value={exp.position} onChange={(val: string) => updateExperience(index, 'position', val)} />
            </div>
            <div className="grid-2">
              <Input label="Start Date" value={exp.startDate} onChange={(val: string) => updateExperience(index, 'startDate', val)} />
              <Input label="End Date" value={exp.endDate} onChange={(val: string) => updateExperience(index, 'endDate', val)} />
            </div>
            <Textarea label="Description" value={exp.description} onChange={(val: string) => updateExperience(index, 'description', val)} />
          </motion.div>
        ))}
      </Section>

      <Section title={t.education} icon={<GraduationCap size={20} />} onAdd={addEducation}>
        {data.education.map((edu, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card item-card"
          >
            <button className="remove-btn" onClick={() => removeEducation(index)}><Trash2 size={16} /></button>
            <div className="grid-2">
              <Input label="School" value={edu.school} onChange={(val: string) => updateEducation(index, 'school', val)} />
              <Input label="Degree" value={edu.degree} onChange={(val: string) => updateEducation(index, 'degree', val)} />
            </div>
            <div className="grid-2">
              <Input label="Start Date" value={edu.startDate} onChange={(val: string) => updateEducation(index, 'startDate', val)} />
              <Input label="End Date" value={edu.endDate} onChange={(val: string) => updateEducation(index, 'endDate', val)} />
            </div>
          </motion.div>
        ))}
      </Section>

      <Section title={t.skills} icon={<Code size={20} />} onAdd={addSkill}>
        <div className="skills-grid">
          {data.skills.map((skill, index) => (
            <div key={index} className="skill-liquid-item glass-card">
              <input 
                placeholder="Skill name" 
                value={skill.name} 
                onChange={(e) => updateSkill(index, 'name', e.target.value)} 
              />
              <select 
                value={skill.level} 
                onChange={(e) => updateSkill(index, 'level', e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <button className="remove-skill" onClick={() => removeSkill(index)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.projects} icon={<Code size={20} />}>
        <div className="toggle-container glass-card">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={data.showPortfolio} 
              onChange={(e) => updateData({ showPortfolio: e.target.checked })} 
            />
            <span className="slider"></span>
          </label>
          <div className="toggle-label">
            <strong>Enable Portfolio Section</strong>
            <p>Show your personal projects on the CV</p>
          </div>
        </div>

        {data.showPortfolio && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            {data.projects.map((proj, index) => (
              <div key={index} className="glass-card item-card">
                <button className="remove-btn" onClick={() => removeProject(index)}><Trash2 size={16} /></button>
                <Input label="Project Name" value={proj.name} onChange={(val) => updateProject(index, 'name', val)} />
                <Input label="Project Link (Optional)" value={proj.link} onChange={(val) => updateProject(index, 'link', val)} />
                <Textarea label="Short Description" value={proj.description} onChange={(val) => updateProject(index, 'description', val)} />
              </div>
            ))}
            <button className="add-btn" onClick={addProject} style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={16} /> Add New Project
            </button>
          </motion.div>
        )}
      </Section>

      <style>{`
        .editor-content { padding-bottom: 6rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; gap: 1rem; }
        .section-title { display: flex; align-items: center; gap: 12px; font-size: 1.25rem; font-weight: 700; color: var(--text-main); }
        .add-btn { background: rgba(99, 102, 241, 0.1); color: var(--primary); padding: 8px 16px; border: 1px solid var(--primary); border-radius: 12px; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .item-card { padding: 1.25rem; margin-bottom: 1rem; position: relative; }
        .remove-btn { position: absolute; top: -10px; right: -10px; background: #ef4444; color: white; padding: 6px; border-radius: 50%; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3); cursor: pointer; border: none; }
        
        .settings-grid { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
        .setting-item { display: flex; flex-direction: column; gap: 10px; }
        .setting-label { font-size: 0.75rem; font-weight: 700; opacity: 0.6; display: flex; align-items: center; gap: 6px; text-transform: uppercase; }
        
        .color-picker { display: flex; flex-wrap: wrap; gap: 8px; }
        .color-swatch-editor { width: 30px; height: 30px; border-radius: 10px; border: 3px solid transparent; cursor: pointer; transition: all 0.2s; }
        .color-swatch-editor.active { border-color: white; transform: scale(1.1); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        
        .font-selectors-editor { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .font-selectors-editor select { padding: 10px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: var(--text-main); font-weight: 600; cursor: pointer; }
        
        .toggle-container-editor { display: flex; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 12px; border: 1px solid var(--glass-border); }
        .toggle-option { flex: 1; padding: 10px; border-radius: 9px; border: none; font-size: 0.85rem; font-weight: 600; cursor: pointer; background: transparent; color: var(--text-main); transition: all 0.2s; }
        .toggle-option.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }

        .photo-liquid-section { display: flex; align-items: center; gap: 20px; margin-bottom: 2rem; background: var(--bg-card); padding: 20px; border-radius: 20px; border: 1px solid var(--glass-border); }
        .photo-glow-wrap { position: relative; }
        .photo-circle { width: 80px; height: 80px; border-radius: 24px; overflow: hidden; border: 3px solid var(--primary); box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
        .photo-circle img { width: 100%; height: 100%; object-fit: cover; }
        .photo-placeholder { width: 80px; height: 80px; border-radius: 24px; border: 2px dashed var(--primary); color: var(--primary); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.7rem; gap: 5px; cursor: pointer; }
        .remove-photo-btn { position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; border: none; }
        
        .skill-liquid-item { display: flex; gap: 10px; padding: 10px; align-items: center; margin-bottom: 10px; }
        .skill-liquid-item input { background: transparent; border: none; flex: 2; padding: 5px; font-weight: 600; color: var(--text-main); outline: none; }
        .skill-liquid-item select { background: rgba(0,0,0,0.05); border: none; flex: 1; padding: 8px; border-radius: 8px; color: var(--text-main); font-weight: 600; cursor: pointer; }
        .remove-skill { background: transparent; border: none; color: #ef4444; cursor: pointer; padding: 5px; }

        .toggle-container { display: flex; align-items: center; gap: 15px; padding: 15px; margin-bottom: 20px; }
        .toggle-switch { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 24px; border: 1px solid var(--glass-border); }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--primary); border-color: var(--primary); }
        input:checked + .slider:before { transform: translateX(20px); }
        .toggle-label strong { display: block; font-size: 0.85rem; }
        .toggle-label p { font-size: 0.7rem; opacity: 0.6; }
        
        .input-group { margin-bottom: 1.25rem; }
        .input-group label { display: block; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; }
        
        @media (max-width: 600px) {
          .grid-2 { grid-template-columns: 1fr; }
          .font-selectors-editor { grid-template-columns: 1fr; }
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

const Textarea: React.FC<{ label: string, value: string, onChange: (val: string) => void }> = ({ label, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

export default CVEditor
