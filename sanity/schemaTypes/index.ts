import project from './project'
import post from './post'
import experience from './experience'
import skill from './skill'
import settings from './settings'
import author from './author'
import event from './event'
import publication from './publication'
import teaching from './teaching'

export const schemaTypes = [
  // Core content types
  author,
  project,
  post,
  publication,
  event,
  teaching,
  
  // Profile and settings
  experience,
  skill,
  settings,
]