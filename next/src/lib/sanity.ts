import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity client configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'quz6kxvy';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries for fetching data
export const queries = {
  // Get all projects
  projects: `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    content,
    featuredImage,
    technologies,
    category,
    status,
    featured,
    liveUrl,
    githubUrl,
    startDate,
    endDate,
    publishedAt
  }`,

  // Get featured projects
  featuredProjects: `*[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    featuredImage,
    technologies,
    category,
    liveUrl,
    githubUrl
  }`,

  // Get single project by slug
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    featuredImage,
    technologies,
    category,
    status,
    featured,
    liveUrl,
    githubUrl,
    startDate,
    endDate,
    publishedAt
  }`,

  // Get all blog posts
  posts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    tags,
    category,
    featured,
    readingTime,
    publishedAt
  }`,

  // Get featured blog posts
  featuredPosts: `*[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    tags,
    category,
    readingTime,
    publishedAt
  }`,

  // Get single blog post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    tags,
    category,
    featured,
    readingTime,
    publishedAt
  }`,

  // Get all experiences
  experiences: `*[_type == "experience"] | order(displayOrder asc, startDate desc) {
    _id,
    title,
    company,
    location,
    type,
    description,
    achievements,
    skills,
    startDate,
    endDate,
    current,
    featured,
    logo,
    website,
    displayOrder
  }`,

  // Get all skills
  skills: `*[_type == "skill"] | order(displayOrder asc, name asc) {
    _id,
    name,
    category,
    proficiencyLevel,
    proficiencyScore,
    description,
    yearsOfExperience,
    icon,
    brandColor,
    featured,
    displayOrder,
    relatedProjects
  }`,

  // Get skills by category
  skillsByCategory: `*[_type == "skill"] | order(displayOrder asc, name asc) {
    _id,
    name,
    category,
    proficiencyLevel,
    proficiencyScore,
    description,
    yearsOfExperience,
    icon,
    brandColor,
    featured,
    displayOrder
  } | group(category)`,

  // Get all authors
  authors: `*[_type == "author"] | order(displayOrder asc, name asc) {
    _id,
    name,
    slug,
    bio,
    avatar,
    email,
    website,
    socialLinks,
    expertise,
    featured,
    displayOrder
  }`,

  // Get featured authors
  featuredAuthors: `*[_type == "author" && featured == true] | order(displayOrder asc, name asc) {
    _id,
    name,
    slug,
    bio,
    avatar,
    expertise,
    socialLinks
  }`,

  // Get single author by slug
  authorBySlug: `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bio,
    avatar,
    email,
    website,
    socialLinks,
    expertise,
    featured,
    displayOrder
  }`,

  // Get all events
  events: `*[_type == "event"] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    content,
    eventType,
    startDate,
    endDate,
    location,
    organizer,
    website,
    registrationUrl,
    featuredImage,
    speakers,
    tags,
    status,
    featured,
    publishedAt
  }`,

  // Get featured events
  featuredEvents: `*[_type == "event" && featured == true] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    eventType,
    startDate,
    endDate,
    location,
    featuredImage,
    status
  }`,

  // Get single event by slug
  eventBySlug: `*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    eventType,
    startDate,
    endDate,
    location,
    organizer,
    website,
    registrationUrl,
    featuredImage,
    speakers[]->{
      _id,
      name,
      slug,
      bio,
      avatar
    },
    tags,
    status,
    featured,
    publishedAt
  }`,

  // Get all publications
  publications: `*[_type == "publication"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    abstract,
    content,
    authors,
    publicationType,
    journal,
    volume,
    issue,
    pages,
    doi,
    isbn,
    publishedDate,
    language,
    keywords,
    urls,
    citations,
    impactFactor,
    featuredImage,
    status,
    featured,
    openAccess,
    peerReviewed
  }`,

  // Get featured publications
  featuredPublications: `*[_type == "publication" && featured == true] | order(publishedDate desc) {
    _id,
    title,
    slug,
    abstract,
    authors[]->{
      _id,
      name,
      slug
    },
    publicationType,
    journal,
    publishedDate,
    featuredImage,
    urls,
    openAccess
  }`,

  // Get single publication by slug
  publicationBySlug: `*[_type == "publication" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    abstract,
    content,
    authors[]->{
      _id,
      name,
      slug,
      bio,
      avatar
    },
    publicationType,
    journal,
    volume,
    issue,
    pages,
    doi,
    isbn,
    publishedDate,
    language,
    keywords,
    urls,
    citations,
    impactFactor,
    featuredImage,
    status,
    featured,
    openAccess,
    peerReviewed
  }`,

  // Get all teaching
  teaching: `*[_type == "teaching"] | order(startDate desc) {
    _id,
    title,
    slug,
    courseCode,
    description,
    content,
    teachingType,
    institution,
    department,
    level,
    subjects,
    technologies,
    startDate,
    endDate,
    semester,
    studentCount,
    role,
    syllabus,
    materials,
    evaluations,
    achievements,
    featuredImage,
    language,
    featured,
    current
  }`,

  // Get featured teaching
  featuredTeaching: `*[_type == "teaching" && featured == true] | order(startDate desc) {
    _id,
    title,
    slug,
    courseCode,
    description,
    teachingType,
    institution,
    startDate,
    endDate,
    semester,
    role,
    featuredImage,
    current
  }`,

  // Get single teaching by slug
  teachingBySlug: `*[_type == "teaching" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    courseCode,
    description,
    content,
    teachingType,
    institution,
    department,
    level,
    subjects,
    technologies,
    startDate,
    endDate,
    semester,
    studentCount,
    role,
    syllabus,
    materials,
    evaluations,
    achievements,
    featuredImage,
    language,
    featured,
    current
  }`,

  // Get site settings
  settings: `*[_type == "settings"][0] {
    _id,
    siteTitle,
    siteDescription,
    seoKeywords,
    author,
    contact,
    socialLinks,
    seo,
    theme,
    navigation
  }`
}

// Helper functions for data fetching
export async function getProjects() {
  return await client.fetch(queries.projects)
}

export async function getFeaturedProjects() {
  return await client.fetch(queries.featuredProjects)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(queries.projectBySlug, { slug })
}

// Alias for getProjectBySlug for consistency
export async function getProject(slug: string) {
  return await client.fetch(queries.projectBySlug, { slug })
}

export async function getPosts() {
  return await client.fetch(queries.posts)
}

export async function getFeaturedPosts() {
  return await client.fetch(queries.featuredPosts)
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(queries.postBySlug, { slug })
}

export async function getExperiences() {
  return await client.fetch(queries.experiences)
}

export async function getSkills() {
  return await client.fetch(queries.skills)
}

export async function getSettings() {
  return await client.fetch(queries.settings)
}

// Authors
export async function getAuthors() {
  return await client.fetch(queries.authors)
}

export async function getFeaturedAuthors() {
  return await client.fetch(queries.featuredAuthors)
}

export async function getAuthorBySlug(slug: string) {
  return await client.fetch(queries.authorBySlug, { slug })
}

// Events
export async function getEvents() {
  return await client.fetch(queries.events)
}

export async function getFeaturedEvents() {
  return await client.fetch(queries.featuredEvents)
}

export async function getEventBySlug(slug: string) {
  return await client.fetch(queries.eventBySlug, { slug })
}

// Publications
export async function getPublications() {
  return await client.fetch(queries.publications)
}

export async function getFeaturedPublications() {
  return await client.fetch(queries.featuredPublications)
}

export async function getPublicationBySlug(slug: string) {
  return await client.fetch(queries.publicationBySlug, { slug })
}

// Teaching
export async function getTeaching() {
  return await client.fetch(queries.teaching)
}

export async function getFeaturedTeaching() {
  return await client.fetch(queries.featuredTeaching)
}

export async function getTeachingBySlug(slug: string) {
  return await client.fetch(queries.teachingBySlug, { slug })
}