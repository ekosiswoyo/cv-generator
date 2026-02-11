import React, { forwardRef } from 'react'
import type { CVData } from '../types'
import { TemplateClassic } from './templates/TemplateClassic.tsx'
import { TemplateMinimalist } from './templates/TemplateMinimalist.tsx'
import { TemplateModern } from './templates/TemplateModern.tsx'

interface CVPreviewProps {
  data: CVData;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const renderTemplate = () => {
    switch (data.template) {
      case 'modern-ats':
        return <TemplateModern data={data} />;
      case 'classic-ats':
        return <TemplateClassic data={data} />;
      case 'minimalist':
        return <TemplateMinimalist data={data} />;
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
