title: Enseignement
summary: Mes cours
type: landing

cascade:
  - _target:
      kind: page
    params:
      show_breadcrumb: true

sections:
  - block: collection
    id: enseignement
    content:
      title: Enseignement
      filters:
        folders:
          - teaching
          - new-folder-1
          - new-folder-2
          - additional-folder
    design:
      view: article-grid
      columns: 2
---