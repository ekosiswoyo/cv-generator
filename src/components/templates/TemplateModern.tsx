import type { CVData } from '../../types'
import { translations } from '../../types'

export const TemplateModern = ({ data }: { data: CVData }) => {
  const t = translations[data.lang]

  const SummarySection = () => (
    <section className="section">
      <h2 className="section-title">{data.isFreshGraduate ? t.objective : t.summary}</h2>
      <p className="summary-text">{data.personalInfo.summary}</p>
    </section>
  )

  const ExperienceSection = () => (
    <section className="section">
      <h2 className="section-title">{data.isFreshGraduate ? t.internships : t.experience}</h2>
      <div className="items">
        {data.experience.map((exp, i) => (
          <div key={i} className="item">
            <div className="item-header">
              <span className="company">{exp.company}</span>
              <span className="date">{exp.startDate} – {exp.endDate}</span>
            </div>
            <div className="position">{exp.position}</div>
            <p className="description">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )

  const EducationSection = () => (
    <section className="section">
      <h2 className="section-title">{t.education}</h2>
      <div className="items">
        {data.education.map((edu, i) => (
          <div key={i} className="item">
            <div className="item-header">
              <span className="school">{edu.school}</span>
              <span className="date">{edu.startDate} – {edu.endDate}</span>
            </div>
            <div className="degree">{edu.degree}</div>
            {edu.description && <p className="description">{edu.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )

  const ExtraSections = () => (
    <>
      {data.showCertifications && data.certifications.length > 0 && (
        <section className="section">
          <h2 className="section-title">{t.certifications}</h2>
          <div className="items">
            {data.certifications.map((cert, i) => (
              <div key={i} className="item">
                <div className="item-header">
                  <span className="company">{cert.name}</span>
                  <span className="date">{cert.date}</span>
                </div>
                <div className="description">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showPortfolio && data.projects.length > 0 && (
        <section className="section">
          <h2 className="section-title">{t.projects}</h2>
          <div className="items">
            {data.projects.map((proj, i) => (
              <div key={i} className="item">
                <div className="item-header">
                  <span className="company">{proj.name}</span>
                  {proj.link && <span className="date">{proj.link}</span>}
                </div>
                <p className="description">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid-2">
        <section className="section">
          <h2 className="section-title">{t.skills}</h2>
          <div className="skills-list">
            {data.skills.map((skill, i) => (
              <span key={i} className="skill-tag">
                {skill.name} <small>({skill.level})</small>
                {i < data.skills.length - 1 && " • "}
              </span>
            ))}
          </div>
        </section>

        {data.showLanguages && data.languages.length > 0 && (
          <section className="section">
            <h2 className="section-title">{t.languages}</h2>
            <div className="skills-list">
              {data.languages.map((lang, i) => (
                <div key={i} style={{ fontSize: '11px', marginBottom: '2px' }}>
                  <strong>{lang.name}</strong> — {lang.level}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )

  return (
    <div className="modern-template">
      <header className="header">
        <div className="header-left">
          {data.personalInfo.photo && (
            <div className="photo-container">
              <img src={data.personalInfo.photo} alt="Profile" />
            </div>
          )}
          <div className="header-text">
            <h1 className="name">{data.personalInfo.fullName}</h1>
            <p className="title">{data.personalInfo.title}</p>
            <div className="contact-info">
              {data.personalInfo.email} • {data.personalInfo.phone}
              <br />
              {data.personalInfo.address}
              {(data.personalInfo.linkedin || data.personalInfo.website) && (
                <div style={{ marginTop: '4px' }}>
                  {data.personalInfo.linkedin && (<span>LinkedIn: {data.personalInfo.linkedin}</span>)}
                  {data.personalInfo.linkedin && data.personalInfo.website && ' • '}
                  {data.personalInfo.website && (<span>Portfolio: {data.personalInfo.website}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {data.showQRCode && (data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="qr-container">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data.personalInfo.linkedin || data.personalInfo.website || '')}`} 
              alt="QR Contact" 
            />
            <span>Scan to view profile</span>
          </div>
        )}
      </header>

      <main className="main-content">
        <SummarySection />
        
        {data.isFreshGraduate ? (
          <>
            <EducationSection />
            <ExperienceSection />
          </>
        ) : (
          <>
            <ExperienceSection />
            <EducationSection />
          </>
        )}

        <ExtraSections />
      </main>

      <style>{`
        .modern-template { padding: 40px; }
        .header { display: flex; align-items: start; justify-content: space-between; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--accent); padding-bottom: 20px; }
        .header-left { display: flex; align-items: center; gap: 25px; }
        .photo-container { width: 85px; height: 85px; border-radius: 50%; overflow: hidden; border: 3px solid var(--accent); flex-shrink: 0; }
        .photo-container img { width: 100%; height: 100%; object-fit: cover; }
        .header-text { text-align: left; }
        .name { font-size: 28px; color: var(--accent); margin-bottom: 2px; font-weight: 800; line-height: 1.1; }
        .title { font-size: 16px; color: #475569; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .contact-info { font-size: 11px; color: #64748b; line-height: 1.5; }
        
        .qr-container { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
        .qr-container img { width: 65px; height: 65px; border: 1px solid #e2e8f0; padding: 2px; }
        .qr-container span { font-size: 8px; color: #94a3b8; font-weight: 700; text-transform: uppercase; }

        .section { margin-bottom: 20px; }
        .section-title { font-size: 13px; font-weight: 800; color: var(--accent); text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 10px; }
        .summary-text { font-size: 11.5px; line-height: 1.6; color: #334155; }
        .item { margin-bottom: 12px; }
        .item-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 12.5px; color: #1e293b; margin-bottom: 2px; }
        .position, .degree { font-style: italic; font-size: 11.5px; color: #475569; margin-bottom: 4px; }
        .description { font-size: 11px; line-height: 1.5; color: #334155; }
        .date { color: var(--accent); font-weight: 700; font-size: 10px; text-transform: uppercase; }
        
        .grid-2 { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; }
        .skills-list { font-size: 11px; color: #334155; line-height: 1.8; }
        .skill-tag small { color: #64748b; }
      `}</style>
    </div>
  )
}
