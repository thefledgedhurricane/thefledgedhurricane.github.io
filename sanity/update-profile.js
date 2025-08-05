import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'quz6kxvy',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN || '', // Token optionnel pour la lecture
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function updateProfile() {
  try {
    console.log('Mise à jour du profil professionnel...')

    // Créer ou mettre à jour les paramètres du site avec les informations de l'utilisateur
    const settings = await client.createOrReplace({
      _id: 'settings',
      _type: 'settings',
      title: 'Portfolio Académique - Intelligence Artificielle',
      description: 'Portfolio professionnel d\'un Maître de Conférences en Intelligence Artificielle et développement avancé',
      keywords: ['Intelligence Artificielle', 'Développement Avancé', 'Recherche', 'Enseignement', 'Publications'],
      author: {
        name: 'Votre Nom', // À remplacer par le nom réel
        title: 'Maître de Conférences en Intelligence Artificielle et développement avancé',
        bio: 'Maître de Conférences spécialisé en Intelligence Artificielle et développement avancé avec 6 ans d\'expérience en recherche (incluant la thèse), 2 ans d\'expérience en tant que consultant, et 10 publications académiques.'
      },
      contact: {
        email: 'votre.email@universite.fr', // À remplacer
        location: 'France'
      }
    })

    console.log('✓ Paramètres du site mis à jour')

    // Créer ou mettre à jour l'auteur principal
    const mainAuthor = await client.createOrReplace({
      _id: 'main-author',
      _type: 'author',
      name: 'Votre Nom', // À remplacer par le nom réel
      slug: { current: 'main-author' },
      bio: 'Maître de Conférences en Intelligence Artificielle et développement avancé. Spécialisé dans la recherche et l\'enseignement des technologies avancées avec une expertise de 6 ans en recherche académique et 2 ans d\'expérience en consulting.',
      email: 'votre.email@universite.fr', // À remplacer
      expertise: [
        'Intelligence Artificielle',
        'Développement Avancé',
        'Machine Learning',
        'Deep Learning',
        'Recherche Académique',
        'Consulting Technologique'
      ],
      featured: true,
      displayOrder: 1
    })

    console.log('✓ Profil auteur principal créé')

    // Créer une entrée d'expérience pour le poste actuel
    const currentPosition = await client.create({
      _type: 'experience',
      title: 'Maître de Conférences en Intelligence Artificielle et développement avancé',
      company: 'Université', // À remplacer par le nom de l\'université
      location: 'France',
      type: 'work',
      description: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Enseignement et recherche en Intelligence Artificielle et développement avancé. Supervision d\'étudiants en master et doctorat, développement de nouveaux cours et programmes pédagogiques.'
            }
          ]
        }
      ],
      startDate: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Il y a 2 ans
      current: true,
      featured: true,
      displayOrder: 1
    })

    console.log('✓ Expérience professionnelle actuelle créée')

    // Créer une entrée pour l'expérience de recherche (thèse incluse)
    const researchExperience = await client.create({
      _type: 'experience',
      title: 'Chercheur Doctorant',
      company: 'Laboratoire de Recherche', // À remplacer
      location: 'France',
      type: 'education',
      description: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '6 ans d\'expérience en recherche académique incluant la thèse de doctorat. Spécialisation en Intelligence Artificielle et développement de solutions avancées.'
            }
          ]
        }
      ],
      startDate: new Date(Date.now() - 6 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Il y a 6 ans
      endDate: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Il y a 2 ans
      current: false,
      featured: true,
      displayOrder: 2
    })

    console.log('✓ Expérience de recherche créée')

    // Créer une entrée pour l'expérience de consulting
    const consultingExperience = await client.create({
      _type: 'experience',
      title: 'Consultant en Intelligence Artificielle',
      company: 'Freelance / Diverses entreprises',
      location: 'France',
      type: 'work',
      description: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '2 ans d\'expérience en tant que consultant spécialisé en Intelligence Artificielle et développement avancé. Accompagnement d\'entreprises dans l\'implémentation de solutions IA.'
            }
          ]
        }
      ],
      startDate: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Il y a 2 ans
      current: true,
      featured: true,
      displayOrder: 3
    })

    console.log('✓ Expérience de consulting créée')

    console.log('\n🎉 Profil professionnel mis à jour avec succès!')
    console.log('\nRésumé des informations mises à jour:')
    console.log('- Titre: Maître de Conférences en Intelligence Artificielle et développement avancé')
    console.log('- 6 ans d\'expérience en recherche (incluant la thèse)')
    console.log('- 2 ans d\'expérience en consulting')
    console.log('- 10 publications académiques (à ajouter séparément)')
    console.log('\nNote: N\'oubliez pas de:')
    console.log('1. Remplacer "Votre Nom" par votre nom réel')
    console.log('2. Mettre à jour l\'email et les informations de contact')
    console.log('3. Ajouter vos 10 publications académiques')
    console.log('4. Personnaliser les noms d\'université et laboratoire')

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
  }
}

// Exécuter la fonction si le script est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  updateProfile()
}

export default updateProfile