import type { CVData } from '../../types'
import { translations } from '../../types'

export const TemplateModern = ({ data }: { data: CVData }) => {
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

  return (
    <div className="modern-template">
      <header className="header">
        {data.personalInfo.photo && (
          <div className="photo-container">
            <img src={data.personalInfo.photo} alt="Profile" />
          </div>
        )}
        <div className="header-text">
          <h1 className="name">{data.personalInfo.fullName}</h1>
          <p className="title">{data.personalInfo.title}</p>
          <div className="contact-info">
            <span>{data.personalInfo.email}</span> • 
            <span>{data.personalInfo.phone}</span> • 
            <span>{data.personalInfo.address}</span>
          </div>
        </div>
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
      </main>

      <style>{`
        .modern-template { padding: 40px; }
        .header { display: flex; align-items: center; justify-content: flex-start; gap: 25px; margin-bottom: 30px; border-bottom: 2px solid var(--accent); padding-bottom: 20px; }
        .photo-container { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; border: 3px solid var(--accent); flex-shrink: 0; }
        .photo-container img { width: 100%; height: 100%; object-fit: cover; }
        .header-text { text-align: left; }
        .name { font-size: 28px; color: var(--accent); margin-bottom: 5px; font-weight: 800; }
        .title { font-size: 16px; color: #475569; margin-bottom: 10px; font-weight: 500; }
        .contact-info { font-size: 11px; color: #64748b; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 14px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 12px; }
        .summary-text { font-size: 12px; line-height: 1.6; color: #334155; }
        .item { margin-bottom: 15px; }
        .item-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #1e293b; margin-bottom: 2px; }
        .position, .degree { font-style: italic; font-size: 12px; color: #475569; margin-bottom: 5px; }
        .description { font-size: 11.5px; line-height: 1.5; color: #334155; }
        .date { color: #64748b; font-weight: 400; font-size: 11px; }
        .skills-list { font-size: 12px; color: #334155; line-height: 1.8; }
        .skill-tag small { color: #64748b; }
        .date { font-size: 10px; color: var(--accent); opacity: 0.8; }
      `}</style>
    </div>
  )
}
