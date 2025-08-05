const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'quz6kxvy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

export default async function() {
  try {
    console.log('Testing Sanity connection...');
    
    // Check all document types
    const allDocs = await client.fetch('*[0...5]{ _type, _id }');
    console.log('First 5 documents:', allDocs);
    
    // Check settings specifically
    const settings = await client.fetch('*[_type == "settings"]');
    console.log('Settings documents:', settings);
    
    return { allDocs, settings };
  } catch (error) {
    console.error('Error:', error.message);
    return { error: error.message };
  }
}