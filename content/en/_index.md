---
# Leave the homepage title empty to use the site title
title: "Home"
date: 2024-12-07
type: landing

design:
  # Default spacing for sections
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (name of a folder in `content/authors/`)
      username: admin
      text: ""      
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your background image in `assets/media/`.
          filename: stacked-peaks.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false
  - block: markdown
    content:
      title: '📚 My Research'
      subtitle: ''
      text: |-
        I develop AI-based approaches, including machine and deep learning for time series, to address real-world challenges in neuroscience and education. By exploring the integration of advanced technologies, my goal is to create practical and innovative solutions to improve educational practices and understanding of cognitive mechanisms.

        I firmly believe that innovation is born from interdisciplinary collaboration. If my work resonates with you, let's connect to exchange ideas and create new solutions together!

    design:
      columns: '1'
  - block: collection
    id: papers
    content:
      title: Featured Publications
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
  - block: collection
    content:
      title: Recent Publications
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation
  - block: collection
    id: talks
    content:
      title: Recent & Upcoming Talks
      filters:
        folders:
          - event
    design:
      view: article-grid
      columns: 1
  - block: collection
    id: news
    content:
      title: Latest News
      subtitle: ''
      text: ''
      # Type of pages to display. E.g., post, talk, publication...
      page_type: post
      # Choose how many pages to display (0 = all pages)
      count: 5
      # Filters
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Page offset
      offset: 0
      # Page order: descending (desc) or ascending (asc) by date.
      order: desc
    design:
      # Choose a layout
      view: date-title-summary
      # Reduce spacing
      spacing:
        padding: [0, 0, 0, 0]
  - block: cta-card
    content:
      title: Collaborate with Me
      text: |-
        Are you interested in collaborating on cutting-edge projects in AI, neuroscience, or educational technologies? Contact me, and together, let's make a difference!
      button:
        text: Contact Me
        url: mailto:i.annaki@ump.ac.ma
    design:
      card:
        # Card background color (CSS class)
        css_class: "bg-primary-700"
        css_style: ""
---
