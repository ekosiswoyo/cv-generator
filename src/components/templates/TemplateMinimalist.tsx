import type { CVData } from '../../types'
import { translations } from '../../types'

export const TemplateMinimalist = ({ data }: { data: CVData }) => {
  const t = translations[data.lang]

  const ExperienceSection = () => (
    <section className="section">
      <h2 className="section-title">{data.isFreshGraduate ? t.internships : t.experience}</h2>
      {data.experience.map((exp, i) => (
        <div key={i} className="item">
          <div className="item-header">
            <strong>{exp.position}</strong>
            <span className="date">{exp.startDate} – {exp.endDate}</span>
          </div>
          <div className="company">{exp.company}</div>
          <p className="description">{exp.description}</p>
        </div>
      ))}
    </section>
  )

  const EducationSection = () => (
    <section className="section">
      <h2 className="section-title">{t.education}</h2>
      {data.education.map((edu, i) => (
        <div key={i} className="item">
          <div className="item-header">
            <strong>{edu.degree}</strong>
            <span className="date">{edu.startDate} – {edu.endDate}</span>
          </div>
          <div className="school">{edu.school}</div>
        </div>
      ))}
    </section>
  )

  return (
    <div className="minimalist-template">
      <div className="sidebar">
        {data.personalInfo.photo && (
          <div className="photo-container">
            <img src={data.personalInfo.photo} alt="Profile" />
          </div>
        )}
        <h1 className="name">{data.personalInfo.fullName}</h1>
        <p className="title">{data.personalInfo.title}</p>
        
        <div className="contact-box">
          <h3 className="sidebar-title">{t.contact}</h3>
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.address}</p>
          {data.personalInfo.linkedin && <p style={{ wordBreak: 'break-all' }}>{data.personalInfo.linkedin}</p>}
        </div>

        <div className="skills-box">
          <h3 className="sidebar-title">{t.skills}</h3>
          {data.skills.map((s, i) => (
            <div key={i} className="skill-item">
              <span>{s.name}</span>
              <div className="skill-bar"><div className="skill-progress" style={{ width: s.level === 'Expert' ? '100%' : s.level === 'Advanced' ? '80%' : s.level === 'Intermediate' ? '60%' : '40%' }}></div></div>
            </div>
          ))}
        </div>

        {data.showLanguages && data.languages.length > 0 && (
          <div className="skills-box">
            <h3 className="sidebar-title">{t.languages}</h3>
            {data.languages.map((l, i) => (
              <div key={i} className="skill-item">
                <span>{l.name}</span>
                <p style={{ fontSize: '9px', opacity: 0.7 }}>{l.level}</p>
              </div>
            ))}
          </div>
        )}

        {data.showQRCode && (data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="qr-sidebar">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data.personalInfo.linkedin || data.personalInfo.website || '')}`} alt="QR" />
          </div>
        )}
      </div>

      <div className="main-content">
        <section className="section">
          <h2 className="section-title">{data.isFreshGraduate ? t.objective : t.summary}</h2>
          <p className="summary-text">{data.personalInfo.summary}</p>
        </section>

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

        {data.showCertifications && data.certifications.length > 0 && (
          <section className="section">
            <h2 className="section-title">{t.certifications}</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="item">
                <div className="item-header">
                  <strong>{cert.name}</strong>
                  <span className="date">{cert.date}</span>
                </div>
                <div className="school">{cert.issuer}</div>
              </div>
            ))}
          </section>
        )}

        {data.showPortfolio && data.projects.length > 0 && (
          <section className="section">
            <h2 className="section-title">{t.projects}</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="item">
                <div className="item-header">
                  <strong>{proj.name}</strong>
                  {proj.link && <span className="date">{proj.link}</span>}
                </div>
                <p className="description">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      <style>{`
        .minimalist-template { display: flex; min-height: 297mm; }
        .sidebar { width: 30%; background: #f8fafc; padding: 40px 20px; border-right: 1px solid #e2e8f0; }
        .photo-container { width: 90px; height: 90px; border-radius: 50%; overflow: hidden; margin-bottom: 25px; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .photo-container img { width: 100%; height: 100%; object-fit: cover; }
        .name { font-size: 20px; font-weight: 800; color: #1e293b; line-height: 1.2; margin-bottom: 5px; }
        .title { font-size: 12px; color: var(--accent); font-weight: 700; text-transform: uppercase; margin-bottom: 30px; }
        .sidebar-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; color: #475569; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; }
        .contact-box, .skills-box { margin-bottom: 25px; font-size: 10.5px; color: #475569; }
        .contact-box p { margin-bottom: 6px; }
        .skill-item { margin-bottom: 10px; }
        .skill-bar { height: 4px; background: #e2e8f0; border-radius: 2px; margin-top: 4px; overflow: hidden; }
        .skill-progress { height: 100%; background: var(--accent); }
        .qr-sidebar { margin-top: 20px; display: flex; justify-content: center; }
        .qr-sidebar img { width: 70px; height: 70px; background: white; padding: 4px; border: 1px solid #eee; }

        .main-content { flex: 1; padding: 40px; background: white; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #1e293b; border-left: 4px solid var(--accent); padding-left: 12px; margin-bottom: 15px; }
        .summary-text { font-size: 11.5px; line-height: 1.6; color: #334155; }
        .item { margin-bottom: 18px; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; margin-bottom: 2px; }
        .date { font-size: 10px; color: #64748b; font-weight: 600; }
        .company, .school { font-size: 11.5px; color: var(--accent); font-weight: 700; margin-bottom: 4px; }
        .description { font-size: 11px; line-height: 1.5; color: #475569; }
      `}</style>
    </div>
  )
}
