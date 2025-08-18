import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Types
export interface Skill {
  id: string;
  name: string;
  icon: string;
  background_color: string;
  text_color: string;
  border_color: string;
  category: string;
  description: string;
  proficiency?: number;
  is_custom: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  category: string;
  skills: (Skill | string)[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
  long_description?: string;
  features?: string[];
  technologies?: string[];
  challenges?: string[];
  outcomes?: string[];
  status?: 'completed' | 'in-progress' | 'planned' | 'n/a';
  start_date?: string;
  end_date?: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low' | 'none';
  live_demo?: string;
  screenshots?: string[];
  team_size?: number;
  role?: string;
  key_metrics?: { label: string; value: string }[];
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  image: string;
  description: string;
  issuer?: string;
  issue_date?: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  category?: 'Technical' | 'Professional' | 'Academic' | 'Security' | 'Achievement';
  skills?: string[];
  verified?: boolean;
  is_active?: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  degree: string;
  course: string;
  institution: string;
  duration: string;
  cgpa?: string;
  level: 'undergraduate' | 'postgraduate' | 'diploma' | 'intermediate' | 'secondary';
  status: 'current' | 'completed' | 'graduated';
  highlights: string[];
  skills: string[];
  custom_image?: string;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EducationHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  value: string;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AboutMe {
  id?: string;
  about_text: string;
  profile_picture: string;
  resume_url: string;
  tagline: string;
  location: string;
  availability: string;
  experience_years: number;
  phone: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  website_url: string;
  skills_summary: string;
  interests: string[];
  languages: string[];
  certifications_count: number;
  projects_count: number;
  is_active: boolean;
}

export interface Highlight {
  id: string;
  icon: string;
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
  color_scheme: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contestRating: number;
  globalRanking: number;
  currentlyAttempting?: string;
  recentSubmissions?: number;
  streak?: number;
}

export interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
  company: string;
  totalStars?: number;
  totalCommits?: number;
  contributionsThisYear?: number;
}

export interface CodingProfile {
  id: string;
  name: string;
  icon: string;
  link: string;
  username?: string;
  description?: string;
  is_active: boolean;
  has_live_stats: boolean;
  order_index: number;
  color_scheme: string;
  achievements?: string[];
  custom_stats?: {
    leetcode?: LeetCodeStats;
    github?: GitHubStats;
    [key: string]: any;
  };
  last_updated?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Resume {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  is_active: boolean;
  upload_date: string;
  created_at?: string;
  updated_at?: string;
}

interface DataContextType {
  // Skills
  skills: SkillCategory[];
  setSkills: (skills: SkillCategory[]) => void;
  customSkills: Skill[];
  addCustomSkill: (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateCustomSkill: (id: string, updates: Partial<Skill>) => Promise<void>;
  deleteCustomSkill: (id: string) => Promise<void>;
  deduplicateSkills: () => Promise<void>;
  clearAllSkills: () => Promise<void>;
  refreshSkillsFromDatabase: () => Promise<void>;

  // Projects
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  refreshProjectsFromDatabase: () => Promise<void>;

  // Certificates
  certificates: Certificate[];
  setCertificates: (certificates: Certificate[]) => void;
  addCertificate: (certificate: Omit<Certificate, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateCertificate: (id: string, updates: Partial<Certificate>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  refreshCertificatesFromDatabase: () => Promise<void>;

  // Education
  education: Education[];
  educationHighlights: EducationHighlight[];
  addEducation: (education: Omit<Education, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateEducation: (id: string, updates: Partial<Education>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  addEducationHighlight: (highlight: Omit<EducationHighlight, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateEducationHighlight: (id: string, updates: Partial<EducationHighlight>) => Promise<void>;
  deleteEducationHighlight: (id: string) => Promise<void>;
  refreshEducationFromDatabase: () => Promise<void>;

  // About Me
  aboutMeData: AboutMe;
  updateAboutMe: (updates: Partial<AboutMe>) => Promise<void>;
  keyHighlights: Highlight[];
  additionalHighlights: Highlight[];
  addKeyHighlight: (highlight: Omit<Highlight, 'id'>) => Promise<void>;
  updateKeyHighlight: (id: string, updates: Partial<Highlight>) => Promise<void>;
  deleteKeyHighlight: (id: string) => Promise<void>;
  addAdditionalHighlight: (highlight: Omit<Highlight, 'id'>) => Promise<void>;
  updateAdditionalHighlight: (id: string, updates: Partial<Highlight>) => Promise<void>;
  deleteAdditionalHighlight: (id: string) => Promise<void>;

  // Coding Profiles
  codingProfiles: CodingProfile[];
  setCodingProfiles: (profiles: CodingProfile[]) => void;
  addCodingProfile: (profile: Omit<CodingProfile, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateCodingProfile: (id: string, updates: Partial<CodingProfile>) => Promise<void>;
  deleteCodingProfile: (id: string) => Promise<void>;
  refreshCodingProfilesFromDatabase: () => Promise<void>;

  // Resumes
  resumes: Resume[];
  activeResume: Resume | null;
  addResume: (resume: Omit<Resume, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateResume: (id: string, updates: Partial<Resume>) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  setResumeActive: (id: string) => Promise<void>;
  refreshResumesFromDatabase: () => Promise<void>;

  // General
  saveData: () => void;
  isLoading: boolean;
  lastSaved: Date | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [skills, setSkills] = useState<SkillCategory[]>([
    { category: 'General Skills', skills: [] },
    { category: 'Programming Languages', skills: [] },
    { category: 'Web Development', skills: [] },
    { category: 'Frameworks & Libraries', skills: [] },
    { category: 'Databases', skills: [] },
    { category: 'Tools & Technologies', skills: [] }
  ]);
  
  const [customSkills, setCustomSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [educationHighlights, setEducationHighlights] = useState<EducationHighlight[]>([]);
  const [codingProfiles, setCodingProfiles] = useState<CodingProfile[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResume, setActiveResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // About Me state
  const [aboutMeData, setAboutMeData] = useState<AboutMe>({
    about_text: '',
    profile_picture: '',
    resume_url: '',
    tagline: '',
    location: '',
    availability: 'Open to opportunities',
    experience_years: 0,
    phone: '',
    email: '',
    linkedin_url: '',
    github_url: '',
    website_url: '',
    skills_summary: '',
    interests: [],
    languages: [],
    certifications_count: 0,
    projects_count: 0,
    is_active: true,
  });

  const [keyHighlights, setKeyHighlights] = useState<Highlight[]>([]);
  const [additionalHighlights, setAdditionalHighlights] = useState<Highlight[]>([]);

  // Database functions
  const fetchSkillsFromDatabase = async () => {
    try {
      const { data: skillsData, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const skills: Skill[] = skillsData?.map(skill => ({
        id: skill.id,
        name: skill.name,
        icon: skill.icon,
        background_color: skill.background_color,
        text_color: skill.text_color,
        border_color: skill.border_color,
        category: skill.category,
        description: skill.description,
        proficiency: skill.proficiency,
        is_custom: skill.is_custom,
        created_at: skill.created_at,
        updated_at: skill.updated_at
      })) || [];

      setCustomSkills(skills);
      
      // Group skills by category
      const groupedSkills = skills.reduce((acc: { [key: string]: Skill[] }, skill: Skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {});

      // Update skills state
      const updatedSkills = [
        { category: 'General Skills', skills: groupedSkills['General Skills'] || [] },
        { category: 'Programming Languages', skills: groupedSkills['Programming Languages'] || [] },
        { category: 'Web Development', skills: groupedSkills['Web Development'] || [] },
        { category: 'Frameworks & Libraries', skills: groupedSkills['Frameworks & Libraries'] || [] },
        { category: 'Databases', skills: groupedSkills['Databases'] || [] },
        { category: 'Tools & Technologies', skills: groupedSkills['Tools & Technologies'] || [] }
      ];

      setSkills(updatedSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchProjectsFromDatabase = async () => {
    try {
      const { data: projectsData, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const projects: Project[] = projectsData?.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        tags: project.tags || [],
        slug: project.slug,
        long_description: project.long_description,
        features: project.features || [],
        technologies: project.technologies || [],
        challenges: project.challenges || [],
        outcomes: project.outcomes || [],
        status: project.status,
        start_date: project.start_date,
        end_date: project.end_date,
        category: project.category,
        priority: project.priority,
        live_demo: project.live_demo,
        screenshots: project.screenshots || [],
        team_size: project.team_size,
        role: project.role,
        key_metrics: project.key_metrics || [],
        created_at: project.created_at,
        updated_at: project.updated_at
      })) || [];

      setProjects(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchCertificatesFromDatabase = async () => {
    try {
      const { data: certificatesData, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;

      const certificates: Certificate[] = certificatesData?.map(cert => ({
        id: cert.id,
        title: cert.title,
        image: cert.image,
        description: cert.description,
        issuer: cert.issuer,
        issue_date: cert.issue_date,
        expiry_date: cert.expiry_date,
        credential_id: cert.credential_id,
        credential_url: cert.credential_url,
        category: cert.category,
        skills: cert.skills || [],
        verified: cert.verified,
        is_active: cert.is_active,
        order_index: cert.order_index,
        created_at: cert.created_at,
        updated_at: cert.updated_at
      })) || [];

      setCertificates(certificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const fetchEducationFromDatabase = async () => {
    try {
      const [{ data: educationData, error: educationError }, { data: highlightsData, error: highlightsError }] = await Promise.all([
        supabase.from('education').select('*').eq('is_active', true).order('order_index', { ascending: true }),
        supabase.from('education_highlights').select('*').eq('is_active', true).order('order_index', { ascending: true })
      ]);

      if (educationError) throw educationError;
      if (highlightsError) throw highlightsError;

      const education: Education[] = educationData?.map(edu => ({
        id: edu.id,
        degree: edu.degree,
        course: edu.course,
        institution: edu.institution,
        duration: edu.duration,
        cgpa: edu.cgpa,
        level: edu.level,
        status: edu.status,
        highlights: edu.highlights || [],
        skills: edu.skills || [],
        custom_image: edu.custom_image,
        order_index: edu.order_index,
        is_active: edu.is_active,
        created_at: edu.created_at,
        updated_at: edu.updated_at
      })) || [];

      const highlights: EducationHighlight[] = highlightsData?.map(highlight => ({
        id: highlight.id,
        title: highlight.title,
        subtitle: highlight.subtitle,
        description: highlight.description,
        icon: highlight.icon,
        color: highlight.color,
        value: highlight.value,
        order_index: highlight.order_index,
        is_active: highlight.is_active,
        created_at: highlight.created_at,
        updated_at: highlight.updated_at
      })) || [];

      setEducation(education);
      setEducationHighlights(highlights);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  const fetchAboutMeFromDatabase = async () => {
    try {
      const [{ data: aboutData, error: aboutError }, { data: keyHighlightsData, error: keyError }, { data: additionalHighlightsData, error: additionalError }] = await Promise.all([
        supabase.from('about_me').select('*').eq('is_active', true).single(),
        supabase.from('key_highlights').select('*').eq('is_active', true).order('order_index', { ascending: true }),
        supabase.from('additional_highlights').select('*').eq('is_active', true).order('order_index', { ascending: true })
      ]);

      if (aboutData && !aboutError) {
        setAboutMeData({
          id: aboutData.id,
          about_text: aboutData.about_text || '',
          profile_picture: aboutData.profile_picture || '',
          resume_url: aboutData.resume_url || '',
          tagline: aboutData.tagline || '',
          location: aboutData.location || '',
          availability: aboutData.availability || 'Open to opportunities',
          experience_years: aboutData.experience_years || 0,
          phone: aboutData.phone || '',
          email: aboutData.email || '',
          linkedin_url: aboutData.linkedin_url || '',
          github_url: aboutData.github_url || '',
          website_url: aboutData.website_url || '',
          skills_summary: aboutData.skills_summary || '',
          interests: aboutData.interests || [],
          languages: aboutData.languages || [],
          certifications_count: aboutData.certifications_count || 0,
          projects_count: aboutData.projects_count || 0,
          is_active: aboutData.is_active || true,
        });
      }

      const keyHighlights: Highlight[] = keyHighlightsData?.map(highlight => ({
        id: highlight.id,
        icon: highlight.icon,
        title: highlight.title,
        description: highlight.description,
        order_index: highlight.order_index,
        is_active: highlight.is_active,
        color_scheme: highlight.color_scheme
      })) || [];

      const additionalHighlights: Highlight[] = additionalHighlightsData?.map(highlight => ({
        id: highlight.id,
        icon: highlight.icon,
        title: highlight.title,
        description: highlight.description,
        order_index: highlight.order_index,
        is_active: highlight.is_active,
        color_scheme: highlight.color_scheme
      })) || [];

      setKeyHighlights(keyHighlights);
      setAdditionalHighlights(additionalHighlights);
    } catch (error) {
      console.error('Error fetching about me data:', error);
    }
  };

  const fetchCodingProfilesFromDatabase = async () => {
    try {
      const { data: profilesData, error } = await supabase
        .from('coding_profiles')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      const profiles: CodingProfile[] = profilesData?.map(profile => ({
        id: profile.id,
        name: profile.name,
        icon: profile.icon,
        link: profile.link,
        username: profile.username,
        description: profile.description,
        is_active: profile.is_active,
        has_live_stats: profile.has_live_stats,
        order_index: profile.order_index,
        color_scheme: profile.color_scheme,
        achievements: profile.achievements || [],
        custom_stats: profile.custom_stats || {},
        last_updated: profile.last_updated,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      })) || [];

      setCodingProfiles(profiles);
    } catch (error) {
      console.error('Error fetching coding profiles:', error);
    }
  };

  const fetchResumesFromDatabase = async () => {
    try {
      const { data: resumesData, error } = await supabase
        .from('resumes')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;

      const resumes: Resume[] = resumesData?.map(resume => ({
        id: resume.id,
        file_name: resume.file_name,
        file_url: resume.file_url,
        file_type: resume.file_type,
        is_active: resume.is_active,
        upload_date: resume.upload_date,
        created_at: resume.created_at,
        updated_at: resume.updated_at
      })) || [];

      setResumes(resumes);
      
      // Set active resume
      const active = resumes.find(resume => resume.is_active);
      setActiveResume(active || null);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  // Project functions
  const addProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .insert([project]);

      if (error) throw error;
      await fetchProjectsFromDatabase();
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchProjectsFromDatabase();
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProjectsFromDatabase();
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  const refreshProjectsFromDatabase = async () => {
    await fetchProjectsFromDatabase();
  };

  // Certificate functions
  const addCertificate = async (certificate: Omit<Certificate, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .insert([certificate]);

      if (error) throw error;
      await fetchCertificatesFromDatabase();
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw error;
    }
  };

  const updateCertificate = async (id: string, updates: Partial<Certificate>) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchCertificatesFromDatabase();
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCertificatesFromDatabase();
    } catch (error) {
      console.error('Error deleting certificate:', error);
      throw error;
    }
  };

  const refreshCertificatesFromDatabase = async () => {
    await fetchCertificatesFromDatabase();
  };

  // Skills functions
  const addCustomSkill = async (skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('skills')
        .insert([{
          name: skill.name,
          icon: skill.icon,
          background_color: skill.background_color,
          text_color: skill.text_color,
          border_color: skill.border_color,
          category: skill.category,
          description: skill.description,
          proficiency: skill.proficiency,
          is_custom: skill.is_custom
        }]);

      if (error) throw error;
      await fetchSkillsFromDatabase();
    } catch (error) {
      console.error('Error adding skill:', error);
      throw error;
    }
  };

  const updateCustomSkill = async (id: string, updates: Partial<Skill>) => {
    try {
      const { error } = await supabase
        .from('skills')
        .update({
          name: updates.name,
          icon: updates.icon,
          background_color: updates.background_color,
          text_color: updates.text_color,
          border_color: updates.border_color,
          category: updates.category,
          description: updates.description,
          proficiency: updates.proficiency,
          is_custom: updates.is_custom
        })
        .eq('id', id);

      if (error) throw error;
      await fetchSkillsFromDatabase();
    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  };

  const deleteCustomSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchSkillsFromDatabase();
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  };

  const deduplicateSkills = async () => {
    try {
      const { data: skillsData, error } = await supabase
        .from('skills')
        .select('*');

      if (error) throw error;

      const seen = new Set();
      const duplicates: string[] = [];

      skillsData?.forEach((skill) => {
        const key = `${skill.name.toLowerCase().trim()}-${skill.category.toLowerCase().trim()}`;
        if (seen.has(key)) {
          duplicates.push(skill.id);
        } else {
          seen.add(key);
        }
      });

      if (duplicates.length > 0) {
        const { error: deleteError } = await supabase
          .from('skills')
          .delete()
          .in('id', duplicates);

        if (deleteError) throw deleteError;
      }

      await fetchSkillsFromDatabase();
    } catch (error) {
      console.error('Error deduplicating skills:', error);
      throw error;
    }
  };

  const clearAllSkills = async () => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

      if (error) throw error;
      await fetchSkillsFromDatabase();
    } catch (error) {
      console.error('Error clearing skills:', error);
      throw error;
    }
  };

  const refreshSkillsFromDatabase = async () => {
    await fetchSkillsFromDatabase();
  };

  // Education functions
  const addEducation = async (education: Omit<Education, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('education')
        .insert([{
          degree: education.degree,
          course: education.course,
          institution: education.institution,
          duration: education.duration,
          cgpa: education.cgpa,
          level: education.level,
          status: education.status,
          highlights: education.highlights,
          skills: education.skills,
          custom_image: education.custom_image,
          order_index: education.order_index,
          is_active: education.is_active
        }]);

      if (error) throw error;
      await fetchEducationFromDatabase();
    } catch (error) {
      console.error('Error adding education:', error);
      throw error;
    }
  };

  const updateEducation = async (id: string, updates: Partial<Education>) => {
    try {
      const { error } = await supabase
        .from('education')
        .update({
          degree: updates.degree,
          course: updates.course,
          institution: updates.institution,
          duration: updates.duration,
          cgpa: updates.cgpa,
          level: updates.level,
          status: updates.status,
          highlights: updates.highlights,
          skills: updates.skills,
          custom_image: updates.custom_image,
          order_index: updates.order_index,
          is_active: updates.is_active
        })
        .eq('id', id);

      if (error) throw error;
      await fetchEducationFromDatabase();
    } catch (error) {
      console.error('Error updating education:', error);
      throw error;
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchEducationFromDatabase();
    } catch (error) {
      console.error('Error deleting education:', error);
      throw error;
    }
  };

  const addEducationHighlight = async (highlight: Omit<EducationHighlight, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('education_highlights')
        .insert([{
          title: highlight.title,
          subtitle: highlight.subtitle,
          description: highlight.description,
          icon: highlight.icon,
          color: highlight.color,
          value: highlight.value,
          order_index: highlight.order_index,
          is_active: highlight.is_active
        }]);

      if (error) throw error;
      await fetchEducationFromDatabase();
    } catch (error) {
      console.error('Error adding education highlight:', error);
      throw error;
    }
  };

  const updateEducationHighlight = async (id: string, updates: Partial<EducationHighlight>) => {
    try {
      const { error } = await supabase
        .from('education_highlights')
        .update({
          title: updates.title,
          subtitle: updates.subtitle,
          description: updates.description,
          icon: updates.icon,
          color: updates.color,
          value: updates.value,
          order_index: updates.order_index,
          is_active: updates.is_active
        })
        .eq('id', id);

      if (error) throw error;
      await fetchEducationFromDatabase();
    } catch (error) {
      console.error('Error updating education highlight:', error);
      throw error;
    }
  };

  const deleteEducationHighlight = async (id: string) => {
    try {
      const { error } = await supabase
        .from('education_highlights')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchEducationFromDatabase();
    } catch (error) {
      console.error('Error deleting education highlight:', error);
      throw error;
    }
  };

  const refreshEducationFromDatabase = async () => {
    await fetchEducationFromDatabase();
  };

  // About Me functions
  const updateAboutMe = async (updates: Partial<AboutMe>) => {
    try {
      if (aboutMeData.id) {
        const { error } = await supabase
          .from('about_me')
          .update({
            about_text: updates.about_text,
            profile_picture: updates.profile_picture,
            resume_url: updates.resume_url,
            tagline: updates.tagline,
            location: updates.location,
            availability: updates.availability,
            experience_years: updates.experience_years,
            phone: updates.phone,
            email: updates.email,
            linkedin_url: updates.linkedin_url,
            github_url: updates.github_url,
            website_url: updates.website_url,
            skills_summary: updates.skills_summary,
            interests: updates.interests,
            languages: updates.languages,
            certifications_count: updates.certifications_count,
            projects_count: updates.projects_count,
            is_active: updates.is_active
          })
          .eq('id', aboutMeData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_me')
          .insert([{
            about_text: updates.about_text || '',
            profile_picture: updates.profile_picture || '',
            resume_url: updates.resume_url || '',
            tagline: updates.tagline || '',
            location: updates.location || '',
            availability: updates.availability || 'Open to opportunities',
            experience_years: updates.experience_years || 0,
            phone: updates.phone || '',
            email: updates.email || '',
            linkedin_url: updates.linkedin_url || '',
            github_url: updates.github_url || '',
            website_url: updates.website_url || '',
            skills_summary: updates.skills_summary || '',
            interests: updates.interests || [],
            languages: updates.languages || [],
            certifications_count: updates.certifications_count || 0,
            projects_count: updates.projects_count || 0,
            is_active: true
          }]);

        if (error) throw error;
      }

      await fetchAboutMeFromDatabase();
    } catch (error) {
      console.error('Error updating about me:', error);
      throw error;
    }
  };

  const addKeyHighlight = async (highlight: Omit<Highlight, 'id'>) => {
    try {
      const { error } = await supabase
        .from('key_highlights')
        .insert([{
          icon: highlight.icon,
          title: highlight.title,
          description: highlight.description,
          order_index: highlight.order_index,
          is_active: highlight.is_active,
          color_scheme: highlight.color_scheme
        }]);

      if (error) throw error;
      await fetchAboutMeFromDatabase();
    } catch (error) {
      console.error('Error adding key highlight:', error);
      throw error;
    }
  };

  const updateKeyHighlight = async (id: string, updates: Partial<Highlight>) => {
    try {
      const { error } = await supabase
        .from('key_highlights')
        .update({
          icon: updates.icon,
          title: updates.title,
          description: updates.description,
          order_index: updates.order_index,
          is_active: updates.is_active,
          color_scheme: updates.color_scheme
        })
        .eq('id', id);

      if (error) throw error;
      await fetchAboutMeFromDatabase();
    } catch (error) {
      console.error('Error updating key highlight:', error);
      throw error;
    }
  };

  const deleteKeyHighlight = async (id: string) => {
    try {
      const { error } = await supabase
        .from('key_highlights')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchAboutMeFromDatabase();
    } catch (error) {
      console.error('Error deleting key highlight:', error);
      throw error;
    }
  };

  const addAdditionalHighlight = async (highlight: Omit<Highlight, 'id'>) => {
    try {
      const { error } = await supabase
        .from('additional_highlights')
        .insert([{
          icon: highlight.icon,
          title: highlight.title,
          description: highlight.description,
          order_index: highlight.order_index,
          is_active: highlight.is_active,
          color_scheme: highlight.color_scheme
        }]);

      if (error) throw error;
      await fetchAboutMeFromDatabase();
    } catch (error) {
      console.error('Error adding additional highlight:', error);
      throw error;
    }
  };

  const updateAdditionalHighlight = async (id: string, updates: Partial<Highlight>) => {
    try {
      const { error } = await supabase
        .from('additional_highlights')
        .update({
          icon: updates.icon,
          title: updates.title,
          description: updates.description,
          order_index: updates.order_index,
          is_active: updates.is_active,
          color_scheme: updates.color_scheme
        })
        .eq('id', id);

      if (error) throw error;
      await fetchAboutMeFromDatabase();
    } catch (error) {
      console.error('Error updating additional highlight:', error);
      throw error;
    }
  };

  const deleteAdditionalHighlight = async (id: string) => {
    try {
      const { error } = await supabase
        .from('additional_highlights')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchAboutMeFromDatabase();
    } catch (error) {
      console.error('Error deleting additional highlight:', error);
      throw error;
    }
  };

  // Coding Profiles functions
  const addCodingProfile = async (profile: Omit<CodingProfile, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('coding_profiles')
        .insert([{
          name: profile.name,
          icon: profile.icon,
          link: profile.link,
          username: profile.username,
          description: profile.description,
          is_active: profile.is_active,
          has_live_stats: profile.has_live_stats,
          order_index: profile.order_index,
          color_scheme: profile.color_scheme,
          achievements: profile.achievements,
          custom_stats: profile.custom_stats,
          last_updated: profile.last_updated
        }]);

      if (error) throw error;
      await fetchCodingProfilesFromDatabase();
    } catch (error) {
      console.error('Error adding coding profile:', error);
      throw error;
    }
  };

  const updateCodingProfile = async (id: string, updates: Partial<CodingProfile>) => {
    try {
      const { error } = await supabase
        .from('coding_profiles')
        .update({
          name: updates.name,
          icon: updates.icon,
          link: updates.link,
          username: updates.username,
          description: updates.description,
          is_active: updates.is_active,
          has_live_stats: updates.has_live_stats,
          order_index: updates.order_index,
          color_scheme: updates.color_scheme,
          achievements: updates.achievements,
          custom_stats: updates.custom_stats,
          last_updated: updates.last_updated
        })
        .eq('id', id);

      if (error) throw error;
      await fetchCodingProfilesFromDatabase();
    } catch (error) {
      console.error('Error updating coding profile:', error);
      throw error;
    }
  };

  const deleteCodingProfile = async (id: string) => {
    try {
      const { error } = await supabase
        .from('coding_profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCodingProfilesFromDatabase();
    } catch (error) {
      console.error('Error deleting coding profile:', error);
      throw error;
    }
  };

  const refreshCodingProfilesFromDatabase = async () => {
    await fetchCodingProfilesFromDatabase();
  };

  // Resume functions
  const addResume = async (resume: Omit<Resume, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // If this is set as active, deactivate all other resumes first
      if (resume.is_active) {
        const { error: deactivateError } = await supabase
          .from('resumes')
          .update({ is_active: false })
          .neq('id', '00000000-0000-0000-0000-000000000000');

        if (deactivateError) throw deactivateError;
      }

      const { error } = await supabase
        .from('resumes')
        .insert([{
          file_name: resume.file_name,
          file_url: resume.file_url,
          file_type: resume.file_type,
          is_active: resume.is_active,
          upload_date: resume.upload_date
        }]);

      if (error) throw error;
      await fetchResumesFromDatabase();
    } catch (error) {
      console.error('Error adding resume:', error);
      throw error;
    }
  };

  const updateResume = async (id: string, updates: Partial<Resume>) => {
    try {
      // If setting this resume as active, deactivate all others first
      if (updates.is_active) {
        const { error: deactivateError } = await supabase
          .from('resumes')
          .update({ is_active: false })
          .neq('id', id);

        if (deactivateError) throw deactivateError;
      }

      const { error } = await supabase
        .from('resumes')
        .update({
          file_name: updates.file_name,
          file_url: updates.file_url,
          file_type: updates.file_type,
          is_active: updates.is_active,
          upload_date: updates.upload_date
        })
        .eq('id', id);

      if (error) throw error;
      await fetchResumesFromDatabase();
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  };

  const deleteResume = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchResumesFromDatabase();
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  };

  const setResumeActive = async (id: string) => {
    try {
      // First, deactivate all resumes
      const { error: deactivateError } = await supabase
        .from('resumes')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deactivateError) throw deactivateError;
      
      // Then, activate the selected resume
      const { error } = await supabase
        .from('resumes')
        .update({ is_active: true })
        .eq('id', id);

      if (error) throw error;
      await fetchResumesFromDatabase();
    } catch (error) {
      console.error('Error setting resume active:', error);
      throw error;
    }
  };

  const refreshResumesFromDatabase = async () => {
    await fetchResumesFromDatabase();
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchSkillsFromDatabase(),
          fetchProjectsFromDatabase(),
          fetchCertificatesFromDatabase(),
          fetchEducationFromDatabase(),
          fetchAboutMeFromDatabase(),
          fetchCodingProfilesFromDatabase(),
          fetchResumesFromDatabase()
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Set up real-time listeners
  useEffect(() => {
    const subscriptions: any[] = [];

    // Skills subscription
    const skillsSubscription = supabase
      .channel('skills_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'skills' }, () => {
        fetchSkillsFromDatabase();
      })
      .subscribe();
    subscriptions.push(skillsSubscription);

    // Projects subscription
    const projectsSubscription = supabase
      .channel('projects_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchProjectsFromDatabase();
      })
      .subscribe();
    subscriptions.push(projectsSubscription);

    // Certificates subscription
    const certificatesSubscription = supabase
      .channel('certificates_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certificates' }, () => {
        fetchCertificatesFromDatabase();
      })
      .subscribe();
    subscriptions.push(certificatesSubscription);

    // Education subscription
    const educationSubscription = supabase
      .channel('education_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'education' }, () => {
        fetchEducationFromDatabase();
      })
      .subscribe();
    subscriptions.push(educationSubscription);

    // About Me subscription
    const aboutMeSubscription = supabase
      .channel('about_me_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'about_me' }, () => {
        fetchAboutMeFromDatabase();
      })
      .subscribe();
    subscriptions.push(aboutMeSubscription);

    // Coding Profiles subscription
    const codingProfilesSubscription = supabase
      .channel('coding_profiles_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coding_profiles' }, () => {
        fetchCodingProfilesFromDatabase();
      })
      .subscribe();
    subscriptions.push(codingProfilesSubscription);

    // Resumes subscription
    const resumesSubscription = supabase
      .channel('resumes_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'resumes' }, () => {
        fetchResumesFromDatabase();
      })
      .subscribe();
    subscriptions.push(resumesSubscription);

    return () => {
      subscriptions.forEach(subscription => {
        supabase.removeChannel(subscription);
      });
    };
  }, []);

  const saveData = () => {
    setLastSaved(new Date());
  };

  return (
    <DataContext.Provider value={{
      skills,
      setSkills,
      customSkills,
      addCustomSkill,
      updateCustomSkill,
      deleteCustomSkill,
      deduplicateSkills,
      clearAllSkills,
      refreshSkillsFromDatabase,
      projects,
      setProjects,
      addProject,
      updateProject,
      deleteProject,
      refreshProjectsFromDatabase,
      certificates,
      setCertificates,
      addCertificate,
      updateCertificate,
      deleteCertificate,
      refreshCertificatesFromDatabase,
      education,
      educationHighlights,
      addEducation,
      updateEducation,
      deleteEducation,
      addEducationHighlight,
      updateEducationHighlight,
      deleteEducationHighlight,
      refreshEducationFromDatabase,
      aboutMeData,
      updateAboutMe,
      keyHighlights,
      additionalHighlights,
      addKeyHighlight,
      updateKeyHighlight,
      deleteKeyHighlight,
      addAdditionalHighlight,
      updateAdditionalHighlight,
      deleteAdditionalHighlight,
      codingProfiles,
      setCodingProfiles,
      addCodingProfile,
      updateCodingProfile,
      deleteCodingProfile,
      refreshCodingProfilesFromDatabase,
      resumes,
      activeResume,
      addResume,
      updateResume,
      deleteResume,
      setResumeActive,
      refreshResumesFromDatabase,
      saveData,
      isLoading,
      lastSaved
    }}>
      {children}
    </DataContext.Provider>
  );
};