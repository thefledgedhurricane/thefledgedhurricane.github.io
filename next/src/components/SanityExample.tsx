'use client'

import { useEffect, useState } from 'react'
import { getFeaturedProjects, getSettings, urlFor } from '@/lib/sanity'
import type { Project, Settings } from '@/lib/sanity-types'
import Image from 'next/image'

export default function SanityExample() {
  const [projects, setProjects] = useState<Project[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [projectsData, settingsData] = await Promise.all([
          getFeaturedProjects(),
          getSettings()
        ])
        setProjects(projectsData)
        setSettings(settingsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading Sanity data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <h3 className="text-red-800 font-semibold">Error loading data</h3>
        <p className="text-red-600 mt-1">{error}</p>
        <p className="text-sm text-red-500 mt-2">
          Make sure your Sanity project is configured correctly and the environment variables are set.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h2 className="text-green-800 font-semibold text-lg">🎉 Sanity CMS Connected Successfully!</h2>
        <p className="text-green-600 mt-1">
          Your Next.js project is now connected to Sanity CMS. Data is being fetched from your Sanity Studio.
        </p>
      </div>

      {/* Site Settings */}
      {settings && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Site Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Site Title</h4>
              <p className="text-gray-600">{settings.siteTitle}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Description</h4>
              <p className="text-gray-600">{settings.siteDescription}</p>
            </div>
            {settings.author && (
              <>
                <div>
                  <h4 className="font-medium text-gray-700">Author</h4>
                  <p className="text-gray-600">{settings.author.name}</p>
                  {settings.author.bio && (
                    <p className="text-sm text-gray-500">{settings.author.bio}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Contact</h4>
                  <p className="text-gray-600">{settings.contact.email}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Featured Projects */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Featured Projects ({projects.length})</h3>
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No featured projects found.</p>
            <p className="text-sm text-gray-400">
              Add some projects in your Sanity Studio and mark them as featured.
            </p>
            <a 
              href="https://iannaki-portfolio.sanity.studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Sanity Studio
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="border border-gray-200 rounded-lg overflow-hidden">
                {project.featuredImage && (
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={urlFor(project.featuredImage).width(400).height(200).url()}
                      alt={project.featuredImage.alt || project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 capitalize">{project.category}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-800 font-semibold mb-2">Next Steps</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Open your <a href="https://iannaki-portfolio.sanity.studio" target="_blank" rel="noopener noreferrer" className="underline">Sanity Studio</a> to add content</li>
          <li>• Create projects, blog posts, experiences, and skills</li>
          <li>• Update your site settings with your personal information</li>
          <li>• Replace this example component with your actual portfolio components</li>
          <li>• Use the helper functions in <code className="bg-blue-100 px-1 rounded">/src/lib/sanity.ts</code> to fetch data</li>
        </ul>
      </div>
    </div>
  )
}