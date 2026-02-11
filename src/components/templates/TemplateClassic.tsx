import type { CVData } from '../../types'
import { translations } from '../../types'

export const TemplateClassic = ({ data }: { data: CVData }) => {
  const t = translations[data.lang]

  const SummarySection = () => (
    <section className="section">
      <h2 className="section-title">{t.summary}</h2>
      <p className="summary-text">{data.personalInfo.summary}</p>
    </section>
  )

  const ExperienceSection = () => (
    <section className="section">
      <h2 className="section-title">{t.experience}</h2>
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
    <div className="classic-template" style={{ fontFamily: "'Times New Roman', serif" }}>
      <header className="header">
        <div className="header-info">
          <h1 className="name">{data.personalInfo.fullName}</h1>
          <div className="contact-info">
            {data.personalInfo.address} | {data.personalInfo.phone} | {data.personalInfo.email}
          </div>
        </div>
        {data.personalInfo.photo && (
          <div className="photo-container">
            <img src={data.personalInfo.photo} alt="Profile" />
          </div>
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

        <section className="section">
          <h2 className="section-title">{t.skills}</h2>
          <p className="skills-text">
            {data.skills.map((s, i) => (
              <span key={i}>{s.name} ({s.level}){i < data.skills.length -1 ? " • " : ""}</span>
            ))}
          </p>
        </section>
      </main>

      <style>{`
        .classic-template { padding: 50px; line-height: 1.4; color: black; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid black; padding-bottom: 10px; }
        .name { font-size: 26px; text-transform: uppercase; margin: 0; }
        .contact-info { font-size: 11px; margin-top: 5px; }
        .photo-container { width: 70px; height: 85px; border: 1px solid black; padding: 2px; }
        .photo-container img { width: 100%; height: 100%; object-fit: cover; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid black; margin-bottom: 8px; }
        .summary-text, .description, .skills-text { font-size: 11.5px; text-align: justify; }
        .item { margin-bottom: 10px; }
        .item-header { display: flex; justify-content: space-between; font-size: 12px; }
        .position, .degree { font-size: 11.5px; margin-bottom: 3px; }
      `}</style>
    </div>
  )
}
