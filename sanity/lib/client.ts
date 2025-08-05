import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: 'quz6kxvy',
  dataset: 'production',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for your portfolio data
export const queries = {
  // Get all projects
  projects: `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
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
    readingTime,
    publishedAt
  }`,

  // Get all experiences
  experiences: `*[_type == "experience"] | order(order asc, startDate desc) {
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
    website
  }`,

  // Get work experiences
  workExperiences: `*[_type == "experience" && type == "work"] | order(startDate desc) {
    _id,
    title,
    company,
    location,
    description,
    achievements,
    skills,
    startDate,
    endDate,
    current,
    logo,
    website
  }`,

  // Get education
  education: `*[_type == "experience" && type == "education"] | order(startDate desc) {
    _id,
    title,
    company,
    location,
    description,
    achievements,
    startDate,
    endDate,
    logo,
    website
  }`,

  // Get all skills
  skills: `*[_type == "skill"] | order(category asc, order asc) {
    _id,
    name,
    category,
    proficiency,
    proficiencyScore,
    description,
    yearsOfExperience,
    icon,
    color,
    featured
  }`,

  // Get featured skills
  featuredSkills: `*[_type == "skill" && featured == true] | order(proficiencyScore desc) {
    _id,
    name,
    category,
    proficiency,
    proficiencyScore,
    icon,
    color
  }`,

  // Get skills by category
  skillsByCategory: `*[_type == "skill"] | order(order asc) {
    _id,
    name,
    category,
    proficiency,
    proficiencyScore,
    icon,
    color
  } | group(category)`,

  // Get site settings
  settings: `*[_type == "settings"][0] {
    title,
    description,
    keywords,
    author,
    contact,
    socialLinks,
    seo,
    theme,
    navigation
  }`
}

// Helper functions for fetching data
export async function getProjects() {
  return await client.fetch(queries.projects)
}

export async function getFeaturedProjects() {
  return await client.fetch(queries.featuredProjects)
}

export async function getProjectBySlug(slug: string) {
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

export async function getWorkExperiences() {
  return await client.fetch(queries.workExperiences)
}

export async function getEducation() {
  return await client.fetch(queries.education)
}

export async function getSkills() {
  return await client.fetch(queries.skills)
}

export async function getFeaturedSkills() {
  return await client.fetch(queries.featuredSkills)
}

export async function getSettings() {
  return await client.fetch(queries.settings)
}