import type { CVData } from '../../types'
import { translations } from '../../types'

export const TemplateClassic = ({ data }: { data: CVData }) => {
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
      {data.experience.map((exp, i) => (
        <div key={i} className="item">
          <div className="item-header">
            <strong>{exp.company}</strong>
            <span>{exp.startDate} – {exp.endDate}</span>
          </div>
          <div className="position"><em>{exp.position}</em></div>
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
            <strong>{edu.school}</strong>
            <span>{edu.startDate} – {edu.endDate}</span>
          </div>
          <div className="degree">{edu.degree}</div>
        </div>
      ))}
    </section>
  )

  return (
    <div className="classic-template">
      <header className="header">
        <div className="header-info">
          <h1 className="name">{data.personalInfo.fullName}</h1>
          <p className="classic-job-title">{data.personalInfo.title}</p>
          <div className="contact-info">
            {data.personalInfo.address} | {data.personalInfo.phone} | {data.personalInfo.email}
            {(data.personalInfo.linkedin || data.personalInfo.website) && (
              <div style={{ marginTop: '2px' }}>
                {data.personalInfo.linkedin && (<span>{data.personalInfo.linkedin}</span>)}
                {data.personalInfo.linkedin && data.personalInfo.website && ' | '}
                {data.personalInfo.website && (<span>{data.personalInfo.website}</span>)}
              </div>
            )}
          </div>
        </div>
        {data.personalInfo.photo ? (
          <div className="photo-container">
            <img src={data.personalInfo.photo} alt="Profile" />
          </div>
        ) : (
          data.showQRCode && (data.personalInfo.linkedin || data.personalInfo.website) && (
            <div className="qr-classic">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data.personalInfo.linkedin || data.personalInfo.website || '')}`} alt="QR" />
            </div>
          )
        )}
      </header>

      <main className="content">
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

        {data.showCertifications && data.certifications.length > 0 && (
          <section className="section">
            <h2 className="section-title">{t.certifications}</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="item">
                <div className="item-header">
                  <strong>{cert.name}</strong>
                  <span>{cert.date}</span>
                </div>
                <div style={{ fontSize: '11px' }}>{cert.issuer}</div>
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
                  {proj.link && <span style={{ fontSize: '10px' }}>{proj.link}</span>}
                </div>
                <p className="description">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid-classic">
          <section className="section">
            <h2 className="section-title">{t.skills}</h2>
            <p className="skills-text">
              {data.skills.map((s, i) => (
                <span key={i}>{s.name} ({s.level}){i < data.skills.length -1 ? " • " : ""}</span>
              ))}
            </p>
          </section>

          {data.showLanguages && data.languages.length > 0 && (
            <section className="section">
              <h2 className="section-title">{t.languages}</h2>
              <p className="skills-text">
                {data.languages.map((l, i) => (
                  <span key={i}>{l.name} ({l.level}){i < data.languages.length -1 ? " • " : ""}</span>
                ))}
              </p>
            </section>
          )}
        </div>
      </main>

      <style>{`
        .classic-template { padding: 40px 50px; line-height: 1.5; color: #1a1a1a; font-family: 'Times New Roman', Times, serif; }
        .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 25px; border-bottom: 3px solid #1a1a1a; padding-bottom: 15px; }
        .name { font-size: 30px; text-transform: uppercase; margin: 0; font-weight: bold; color: black; line-height: 1; }
        .classic-job-title { font-size: 14px; font-weight: bold; color: #444; text-transform: uppercase; margin: 5px 0 10px 0; }
        .contact-info { font-size: 11px; font-weight: 600; }
        .photo-container { width: 75px; height: 95px; border: 1.5px solid black; padding: 2px; }
        .photo-container img { width: 100%; height: 100%; object-fit: cover; }
        .qr-classic img { width: 65px; height: 65px; border: 1.5px solid #eee; padding: 2px; }

        .section { margin-bottom: 20px; }
        .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1.5px solid #1a1a1a; margin-bottom: 10px; color: black; padding-bottom: 2px; }
        .summary-text, .description, .skills-text { font-size: 11px; text-align: justify; color: #222; }
        .item { margin-bottom: 12px; }
        .item-header { display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; }
        .position, .degree { font-size: 11.5px; margin-bottom: 4px; color: #333; }
        .grid-classic { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
      `}</style>
    </div>
  )
}
