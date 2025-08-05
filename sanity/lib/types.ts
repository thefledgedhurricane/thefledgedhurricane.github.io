// Sanity document types for your portfolio

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityBlock {
  _type: 'block'
  _key: string
  style: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    [key: string]: any
  }>
}

export interface SanityCodeBlock {
  _type: 'code'
  _key: string
  language: string
  code: string
}

export type SanityContent = Array<SanityBlock | SanityImage | SanityCodeBlock>

// Project schema
export interface Project extends SanityDocument {
  _type: 'project'
  title: string
  slug: SanitySlug
  description: string
  content?: SanityContent
  featuredImage?: SanityImage
  technologies?: string[]
  category: 'web' | 'mobile' | 'research' | 'design' | 'data' | 'other'
  status: 'completed' | 'in-progress' | 'on-hold'
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  startDate?: string
  endDate?: string
  publishedAt: string
}

// Blog Post schema
export interface Post extends SanityDocument {
  _type: 'post'
  title: string
  slug: SanitySlug
  excerpt: string
  content?: SanityContent
  featuredImage?: SanityImage
  tags?: string[]
  category?: 'technology' | 'research' | 'tutorial' | 'personal' | 'academic'
  featured: boolean
  readingTime?: number
  publishedAt: string
}

// Experience schema
export interface Experience extends SanityDocument {
  _type: 'experience'
  title: string
  company: string
  location?: string
  type: 'work' | 'education' | 'volunteer' | 'internship'
  description?: SanityContent
  achievements?: string[]
  skills?: string[]
  startDate: string
  endDate?: string
  current: boolean
  featured: boolean
  logo?: SanityImage
  website?: string
  order: number
}

// Skill schema
export interface Skill extends SanityDocument {
  _type: 'skill'
  name: string
  category: 'programming' | 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'research' | 'soft' | 'other'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  proficiencyScore?: number
  description?: string
  yearsOfExperience?: number
  icon?: SanityImage
  color?: string
  featured: boolean
  order: number
  relatedProjects?: Project[]
}

// Settings schema
export interface Settings extends SanityDocument {
  _type: 'settings'
  title: string
  description: string
  keywords?: string[]
  author: {
    name: string
    title?: string
    bio?: string
    avatar?: SanityImage
    resume?: SanityFile
  }
  contact: {
    email?: string
    phone?: string
    location?: string
    timezone?: string
  }
  socialLinks?: Array<{
    platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'youtube' | 'medium' | 'devto' | 'dribbble' | 'behance' | 'other'
    url: string
    username?: string
  }>
  seo: {
    ogImage?: SanityImage
    twitterHandle?: string
    googleAnalyticsId?: string
  }
  theme: {
    primaryColor?: string
    secondaryColor?: string
    darkMode: boolean
  }
  navigation: {
    showBlog: boolean
    showProjects: boolean
    showAbout: boolean
    showContact: boolean
  }
}

// Utility types
export type SanityDocumentType = Project | Post | Experience | Skill | Settings

export interface SanityReference {
  _type: 'reference'
  _ref: string
}

// API response types
export interface ProjectsResponse {
  projects: Project[]
}

export interface PostsResponse {
  posts: Post[]
}

export interface ExperiencesResponse {
  experiences: Experience[]
}

export interface SkillsResponse {
  skills: Skill[]
}

export interface SettingsResponse {
  settings: Settings
}