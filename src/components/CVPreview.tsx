import React, { forwardRef } from 'react'
import type { CVData } from '../types'
import { TemplateClassic } from './templates/TemplateClassic.tsx'
import { TemplateCreative } from './templates/TemplateCreative.tsx'
import { TemplateMinimalist } from './templates/TemplateMinimalist.tsx'
import { TemplateModern } from './templates/TemplateModern.tsx'

interface CVPreviewProps {
  data: CVData;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const renderTemplate = () => {
    if (data.coverLetter.show) {
      return (
        <div className="cover-letter-base">
          <header className="cl-header">
            <div className="user-info">
              <h1>{data.personalInfo.fullName}</h1>
              <p>{data.personalInfo.title}</p>
              <div className="contact-cl">
                {data.personalInfo.email} • {data.personalInfo.phone} <br/>
                {data.personalInfo.address}
              </div>
            </div>
            {data.personalInfo.photo && (
              <div className="cl-photo">
                <img src={data.personalInfo.photo} alt="Profile" />
              </div>
            )}
          </header>

          <div className="cl-body">
            <div className="date-cl">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            
            <div className="recipient-cl">
              <strong>{data.coverLetter.recipientName}</strong><br/>
              {data.coverLetter.recipientTitle}<br/>
              {data.coverLetter.companyName}<br/>
              {data.coverLetter.companyAddress}
            </div>

            <div className="letter-text">
              <p>Dear {data.coverLetter.recipientName},</p>
              <p className="cl-main-body">{data.coverLetter.body}</p>
              <br/>
              <p>Sincerely,</p>
              <br/>
              <strong>{data.personalInfo.fullName}</strong>
            </div>
          </div>

          <style>{`
            .cover-letter-base { padding: 50px 60px; min-height: 297mm; background: white; color: #1e293b; font-family: 'Inter', sans-serif; }
            .cl-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--accent); padding-bottom: 30px; margin-bottom: 40px; }
            .user-info h1 { font-size: 32px; font-weight: 800; color: var(--accent); margin-bottom: 5px; }
            .user-info p { font-size: 16px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
            .contact-cl { font-size: 11px; color: #94a3b8; margin-top: 5px; line-height: 1.6; }
            .cl-photo { width: 70px; height: 70px; border-radius: 50%; border: 3px solid var(--accent); overflow: hidden; }
            .cl-photo img { width: 100%; height: 100%; object-fit: cover; }
            
            .cl-body { max-width: 800px; margin: 0 auto; line-height: 1.7; color: #334155; }
            .date-cl { margin-bottom: 25px; font-weight: 600; font-size: 13px; }
            .recipient-cl { margin-bottom: 35px; font-size: 13px; }
            .letter-text { font-size: 13px; white-space: pre-wrap; }
            .cl-main-body { margin: 20px 0; }
          `}</style>
        </div>
      );
    }

    switch (data.template) {
      case 'modern-ats':
        return <TemplateModern data={data} />;
      case 'classic-ats':
        return <TemplateClassic data={data} />;
      case 'minimalist':
        return <TemplateMinimalist data={data} />;
      case 'creative-sidebar':
        return <TemplateCreative data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  }

  return (
    <div 
      ref={ref} 
      className="cv-paper"
      style={{ 
        '--accent': data.accentColor,
        '--header-font': data.headerFont,
        '--body-font': data.bodyFont
      } as React.CSSProperties}
    >
      {renderTemplate()}
      
      <style>{`
        .cv-paper {
          background: white;
          color: #1e293b;
          font-family: var(--body-font), Arial, sans-serif;
          width: 100%;
          min-height: 297mm;
          padding: 0;
          box-sizing: border-box;
          text-align: left;
        }

        .cv-paper h1, .cv-paper h2, .cv-paper h3 {
          font-family: var(--header-font), sans-serif;
        }

        @media print {
          .cv-paper {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
})

CVPreview.displayName = 'CVPreview'
export default CVPreview
