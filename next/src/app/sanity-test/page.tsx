import { Metadata } from 'next'
import SanityExample from '@/components/SanityExample'

export const metadata: Metadata = {
  title: 'Sanity CMS Test',
  description: 'Testing Sanity CMS integration with Next.js',
}

export default function SanityTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Sanity CMS Integration Test
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page demonstrates the connection between your Next.js portfolio and Sanity CMS. 
            The data below is fetched directly from your Sanity Studio.
          </p>
        </div>
        
        <SanityExample />
      </div>
    </div>
  )
}