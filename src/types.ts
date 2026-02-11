export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level: string; 
}

export interface Project {
  name: string;
  link: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    title: string;
    photo?: string;
    linkedin?: string;
    website?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  showPortfolio: boolean;
  showCertifications: boolean;
  showLanguages: boolean;
  accentColor: string;
  template: 'modern-ats' | 'classic-ats' | 'minimalist' | 'creative-sidebar';
  headerFont: string;
  bodyFont: string;
  lang: 'en' | 'id';
  isFreshGraduate: boolean;
  showQRCode: boolean;
  coverLetter: {
    show: boolean;
    recipientName: string;
    recipientTitle: string;
    companyName: string;
    companyAddress: string;
    body: string;
  };
}

export const translations = {
  en: {
    appTitle: "CleanCV",
    appDesc: "ATS friendly, customizable, private",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Portfolio / Projects",
    certifications: "Certifications",
    languages: "Languages",
    design: "Design & Style",
    career: "Career Level",
    objective: "Career Objective",
    internships: "Experience & Internships",
    contact: "Contact",
    present: "Present",
    coverLetter: "Cover Letter",
    qrcode: "Add QR Code (link to LinkedIn/Portfolio)",
    tips: "Smart ATS Tips"
  },
  id: {
    appTitle: "CleanCV",
    appDesc: "ATS friendly, customizable, private, siap kirim kerja",
    summary: "Ringkasan Profesional",
    experience: "Pengalaman Kerja",
    education: "Pendidikan",
    skills: "Keahlian",
    projects: "Portofolio / Projek",
    certifications: "Sertifikasi",
    languages: "Bahasa",
    design: "Desain & Gaya",
    career: "Level Karier",
    objective: "Tujuan Karier",
    internships: "Pengalaman & Organisasi",
    contact: "Kontak",
    present: "Sekarang",
    coverLetter: "Surat Lamaran",
    qrcode: "Tambah QR Code (link LinkedIn/Portfolio)",
    tips: "Tips ATS Pintar"
  }
};

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812 3456 7890",
    address: "Jakarta, Indonesia",
    summary: "Dedicated software engineer with over 5 years of experience in building scalable web applications. Passionate about clean code and user-centric design.",
    title: "Full Stack Developer",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com"
  },
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Developer",
      startDate: "Jan 2020",
      endDate: translations.en.present,
      description: "Led the development of a high-traffic e-commerce platform using React and Node.js. Optimized performance by 40%."
    }
  ],
  education: [
    {
      school: "University of Indonesia",
      degree: "Computer Science",
      startDate: "2015",
      endDate: "2019",
      description: "GPA: 3.8/4.0. Focused on software engineering and algorithms."
    }
  ],
  skills: [
    { name: "JavaScript", level: "Expert" },
    { name: "React", level: "Expert" }
  ],
  projects: [],
  certifications: [],
  languages: [
    { name: "English", level: "Professional Working Proficiency" },
    { name: "Indonesian", level: "Native" }
  ],
  showPortfolio: false,
  showCertifications: false,
  showLanguages: true,
  accentColor: "#6366f1",
  template: "modern-ats",
  headerFont: "'Outfit', sans-serif",
  bodyFont: "'Inter', sans-serif",
  lang: 'en',
  isFreshGraduate: false,
  showQRCode: false,
  coverLetter: {
    show: false,
    recipientName: "Hiring Manager",
    recipientTitle: "HR Director",
    companyName: "Target Company Name",
    companyAddress: "Company Street Address, City",
    body: "I am writing to express my strong interest in the [Position Name] position at [Company Name]. With my background in [Your Field] and my experience in [One Key Accomplishment], I am confident that I can contribute effectively to your team..."
  }
};
