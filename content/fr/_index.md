---
# Laissez le titre de la page d'accueil vide pour utiliser le titre du site
title: "Home"
date: 2024-12-07
type: landing

design:
  # Espacement par défaut des sections
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choisissez un profil utilisateur à afficher (nom d'un dossier dans `content/authors/`)
      username: admin
      text: ""      
    design:
      css_class: dark
      background:
        color: black
        image:
          # Ajoutez votre image d'arrière-plan dans `assets/media/`.
          filename: stacked-peaks.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false
  - block: markdown
    content:
      title: '📚 Mes Recherches'
      subtitle: ''
      text: |-
        Je développe des approches basées sur l’IA, notamment l’apprentissage automatique et profond pour les séries temporelles, afin de répondre à des défis concrets dans les neurosciences et l’éducation. En explorant l'intégration des technologies avancées, mon objectif est de créer des solutions pratiques et novatrices pour améliorer les pratiques éducatives et la compréhension des mécanismes cognitifs.

        Je suis convaincu que l’innovation naît de la collaboration entre disciplines. Si mes travaux vous interpellent, connectons-nous pour échanger et concevoir ensemble de nouvelles idées !

    design:
      columns: '1'
  - block: collection
    id: papers
    content:
      title: Publications en Vedette
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
  - block: collection
    content:
      title: Publications Récentes
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
      title: Conférences Récentes & À Venir
      filters:
        folders:
          - event
    design:
      view: article-grid
      columns: 1
  - block: collection
    id: news
    content:
      title: Actualités Récentes
      subtitle: ''
      text: ''
      # Type de page à afficher. Ex. post, talk, publication...
      page_type: post
      # Choisissez combien de pages afficher (0 = toutes les pages)
      count: 5
      # Filtres
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Décalage du nombre de pages
      offset: 0
      # Ordre des pages : décroissant (desc) ou croissant (asc) par date.
      order: desc
    design:
      # Choisissez une disposition
      view: date-title-summary
      # Réduire l'espacement
      spacing:
        padding: [0, 0, 0, 0]
  - block: cta-card
    content:
      title: Collaborer avec Moi
      text: |-
        Vous êtes intéressé par une collaboration sur des projets d'avant-garde en IA, neurosciences ou technologies éducatives ? Contactez-moi, et ensemble, faisons une différence !
      button:
        text: Me Contacter
        url: mailto:i.annaki@ump.ac.ma
    design:
      card:
        # Couleur de fond de la carte (classe CSS)
        css_class: "bg-primary-700"
        css_style: ""
---
