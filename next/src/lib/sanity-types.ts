// Sanity document types for the portfolio

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
  caption?: string
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
  style?: string
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
  _type: 'codeBlock'
  _key: string
  language?: string
  filename?: string
  code: string
  highlightedLines?: number[]
}

export type SanityContent = Array<SanityBlock | SanityCodeBlock | SanityImage>

// Project schema
export interface Project extends SanityDocument {
  _type: 'project'
  title: string
  slug: SanitySlug
  description: string
  content?: SanityContent
  featuredImage?: SanityImage
  technologies: string[]
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'data' | 'other'
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled'
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  startDate?: string
  endDate?: string
  publishedAt: string
}

// Blog post schema
export interface Post extends SanityDocument {
  _type: 'post'
  title: string
  slug: SanitySlug
  excerpt?: string
  content: SanityBlock[]
  featuredImage?: SanityImage
  authors?: Author[]
  tags?: string[]
  language: 'en' | 'fr' | 'es' | 'de' | 'other'
  category?: string
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
  description: string
  achievements?: string[]
  skills?: string[]
  startDate: string
  endDate?: string
  current: boolean
  featured: boolean
  logo?: SanityImage
  website?: string
  displayOrder: number
}

// Skill schema
export interface Skill extends SanityDocument {
  _type: 'skill'
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'other'
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  proficiencyScore: number
  description?: string
  yearsOfExperience?: number
  icon?: string
  brandColor?: string
  featured: boolean
  displayOrder: number
  relatedProjects?: Array<{
    _ref: string
    _type: 'reference'
  }>
}

// Author interface
export interface Author extends SanityDocument {
  _type: 'author'
  name: string
  slug: SanitySlug
  bio?: string
  avatar?: SanityImage
  email?: string
  website?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    behance?: string
  }
  expertise?: string[]
  featured: boolean
  displayOrder: number
}

// Event interface
export interface Event extends SanityDocument {
  _type: 'event'
  title: string
  slug: SanitySlug
  description?: string
  content?: SanityBlock[]
  eventType: 'conference' | 'workshop' | 'seminar' | 'webinar' | 'presentation' | 'panel' | 'lecture' | 'other'
  startDate: string
  endDate?: string
  location?: {
    venue?: string
    city?: string
    country?: string
    isVirtual: boolean
  }
  organizer?: string
  website?: string
  registrationUrl?: string
  featuredImage?: SanityImage
  speakers?: Author[]
  tags?: string[]
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  featured: boolean
  publishedAt: string
}

// Publication interface
export interface Publication extends SanityDocument {
  _type: 'publication'
  title: string
  slug: SanitySlug
  abstract?: string
  content?: SanityBlock[]
  authors: Author[]
  publicationType: 'journal' | 'conference' | 'chapter' | 'book' | 'thesis' | 'report' | 'preprint' | 'blog' | 'other'
  journal?: string
  volume?: string
  issue?: string
  pages?: string
  doi?: string
  isbn?: string
  publishedDate: string
  language: 'en' | 'fr' | 'es' | 'de' | 'other'
  keywords?: string[]
  urls?: {
    pdf?: string
    publisher?: string
    arxiv?: string
    github?: string
    dataset?: string
  }
  citations?: number
  impactFactor?: number
  featuredImage?: SanityImage
  status: 'published' | 'inpress' | 'review' | 'preparation' | 'draft'
  featured: boolean
  openAccess: boolean
  peerReviewed: boolean
}

// Teaching interface
export interface Teaching extends SanityDocument {
  _type: 'teaching'
  title: string
  slug: SanitySlug
  courseCode?: string
  description?: string
  content?: SanityBlock[]
  teachingType: 'undergraduate' | 'graduate' | 'workshop' | 'tutorial' | 'seminar' | 'lab' | 'guest' | 'online' | 'other'
  institution: string
  department?: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'mixed'
  subjects?: string[]
  technologies?: string[]
  startDate: string
  endDate?: string
  semester?: string
  studentCount?: number
  role: 'instructor' | 'ta' | 'guest' | 'lab_instructor' | 'tutor' | 'co_instructor'
  syllabus?: SanityFile
  materials?: Array<{
    title: string
    type: 'slides' | 'assignment' | 'lab' | 'reading' | 'video' | 'code' | 'other'
    file?: SanityFile
    url?: string
    description?: string
  }>
  evaluations?: {
    averageRating?: number
    responseRate?: number
    highlights?: string[]
  }
  achievements?: string[]
  featuredImage?: SanityImage
  language: 'en' | 'fr' | 'es' | 'de' | 'other'
  featured: boolean
  current: boolean
}

// Settings schema
export interface Settings extends SanityDocument {
  _type: 'settings'
  siteTitle: string
  siteDescription: string
  seoKeywords?: string[]
  author: {
    name: string
    email: string
    bio?: string
    avatar?: SanityImage
  }
  contact: {
    email: string
    phone?: string
    address?: string
  }
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    behance?: string
    dribbble?: string
    instagram?: string
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
    twitterHandle?: string
  }
  theme: {
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
  }
  navigation: Array<{
    title: string
    href: string
    external?: boolean
  }>
}

// API response types
export interface ApiResponse<T> {
  data: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Utility types
export type ProjectStatus = Project['status']
export type ProjectCategory = Project['category']
export type ExperienceType = Experience['type']
export type SkillCategory = Skill['category']
export type ProficiencyLevel = Skill['proficiencyLevel']
export type EventType = Event['eventType']
export type EventStatus = Event['status']
export type PublicationType = Publication['publicationType']
export type PublicationStatus = Publication['status']
export type TeachingType = Teaching['teachingType']
export type TeachingRole = Teaching['role']
export type Language = 'en' | 'fr' | 'es' | 'de' | 'other'