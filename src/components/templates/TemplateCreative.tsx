import type { CVData } from '../../types'
import { translations } from '../../types'

export const TemplateCreative = ({ data }: { data: CVData }) => {
  const t = translations[data.lang]

  return (
    <div className="creative-template">
      <aside className="sidebar">
        {data.personalInfo.photo && (
          <div className="photo-wrap">
            <img src={data.personalInfo.photo} alt="Profile" />
          </div>
        )}
        
        <div className="sidebar-section">
          <h3 className="sidebar-title">{t.contact}</h3>
          <div className="sidebar-info">
            <div className="info-item"><strong>E:</strong> {data.personalInfo.email}</div>
            <div className="info-item"><strong>P:</strong> {data.personalInfo.phone}</div>
            <div className="info-item"><strong>A:</strong> {data.personalInfo.address}</div>
            {data.personalInfo.linkedin && (
              <div className="info-item"><strong>L:</strong> {data.personalInfo.linkedin}</div>
            )}
            {data.personalInfo.website && (
              <div className="info-item"><strong>W:</strong> {data.personalInfo.website}</div>
            )}
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">{t.skills}</h3>
          <div className="skill-bars">
            {data.skills.map((skill, i) => (
              <div key={i} className="skill-bar-item">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bg">
                  <div className="skill-fill" style={{ 
                    width: skill.level === 'Expert' ? '100%' : 
                           skill.level === 'Advanced' ? '85%' : 
                           skill.level === 'Intermediate' ? '65%' : '40%' 
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.showLanguages && data.languages.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">{t.languages}</h3>
            {data.languages.map((lang, i) => (
              <div key={i} className="lang-item">
                <strong>{lang.name}</strong>
                <span>{lang.level}</span>
              </div>
            ))}
          </div>
        )}

        {data.showQRCode && (data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="sidebar-section qr-centered">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(data.personalInfo.linkedin || data.personalInfo.website || '')}`} 
              alt="QR Contact"
              className="qr-img"
            />
          </div>
        )}
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="name">{data.personalInfo.fullName}</h1>
          <p className="title">{data.personalInfo.title}</p>
        </header>

        <section className="main-section">
          <h2 className="main-title">{data.isFreshGraduate ? t.objective : t.summary}</h2>
          <p className="summary-p">{data.personalInfo.summary}</p>
        </section>

        {data.isFreshGraduate ? (
          <>
            <section className="main-section">
              <h2 className="main-title">{t.education}</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="edu-item">
                  <div className="edu-header">
                    <strong>{edu.degree}</strong>
                    <span className="edu-date">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="edu-school">{edu.school}</div>
                </div>
              ))}
            </section>
            <section className="main-section">
              <h2 className="main-title">{t.internships}</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="exp-item">
                  <div className="exp-header">
                    <strong>{exp.position}</strong>
                    <span className="exp-date">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="exp-company">{exp.company}</div>
                  <p className="exp-desc">{exp.description}</p>
                </div>
              ))}
            </section>
          </>
        ) : (
          <>
            <section className="main-section">
              <h2 className="main-title">{t.experience}</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="exp-item">
                  <div className="exp-header">
                    <strong>{exp.position}</strong>
                    <span className="exp-date">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="exp-company">{exp.company}</div>
                  <p className="exp-desc">{exp.description}</p>
                </div>
              ))}
            </section>
            <section className="main-section">
              <h2 className="main-title">{t.education}</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="edu-item">
                  <div className="edu-header">
                    <strong>{edu.degree}</strong>
                    <span className="edu-date">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="edu-school">{edu.school}</div>
                </div>
              ))}
            </section>
          </>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section className="main-section">
            <h2 className="main-title">{t.certifications}</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="cert-item">
                <strong>{cert.name}</strong> • {cert.issuer} ({cert.date})
              </div>
            ))}
          </section>
        )}
      </main>

      <style>{`
        .creative-template { display: grid; grid-template-columns: 240px 1fr; min-height: 297mm; }
        .sidebar { background: #1e293b; color: white; padding: 30px 20px; }
        .photo-wrap { width: 130px; height: 130px; border-radius: 50%; border: 5px solid var(--accent); overflow: hidden; margin: 0 auto 30px; }
        .photo-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .sidebar-section { margin-bottom: 25px; }
        .sidebar-title { font-size: 13px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; margin-bottom: 12px; color: var(--accent); }
        .sidebar-info { font-size: 10px; line-height: 1.8; color: #cbd5e1; }
        .info-item strong { color: white; margin-right: 5px; }
        
        .skill-bar-item { margin-bottom: 10px; }
        .skill-name { font-size: 10px; margin-bottom: 4px; font-weight: 600; }
        .skill-bg { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
        .skill-fill { height: 100%; background: var(--accent); border-radius: 2px; }
        
        .lang-item { font-size: 10px; margin-bottom: 8px; display: flex; flex-direction: column; }
        .lang-item span { opacity: 0.6; font-size: 9px; }
        .qr-centered { display: flex; justify-content: center; padding-top: 10px; }
        .qr-img { background: white; padding: 4px; border-radius: 4px; }

        .main-content { background: white; padding: 40px; color: #1e293b; }
        .header { margin-bottom: 35px; }
        .name { font-size: 36px; font-weight: 800; line-height: 1; margin-bottom: 10px; color: #1e293b; }
        .title { font-size: 18px; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        
        .main-title { font-size: 15px; font-weight: 800; border-left: 4px solid var(--accent); padding-left: 12px; margin-bottom: 15px; text-transform: uppercase; color: #1e293b; }
        .main-section { margin-bottom: 30px; }
        .summary-p { font-size: 11.5px; line-height: 1.6; color: #475569; }
        
        .exp-item, .edu-item { margin-bottom: 15px; }
        .exp-header, .edu-header { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; margin-bottom: 2px; }
        .exp-company, .edu-school { font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 5px; }
        .exp-desc { font-size: 11px; color: #475569; line-height: 1.5; }
        .exp-date, .edu-date { font-size: 10px; font-weight: 700; color: #94a3b8; }
        .cert-item { font-size: 11px; margin-bottom: 5px; }
      `}</style>
    </div>
  )
}
