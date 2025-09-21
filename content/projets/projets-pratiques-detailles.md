# Projets Pratiques Ultra-Détaillés

Ce document contient des projets pratiques complets pour mettre en application les concepts appris dans le système LMS. Chaque projet est conçu pour renforcer les compétences de manière progressive et pratique.

## 📋 Table des Matières

1. [Projet 1: Système de Gestion de Bibliothèque](#projet-1-système-de-gestion-de-bibliothèque)
2. [Projet 2: Analyseur de Données de Ventes](#projet-2-analyseur-de-données-de-ventes)
3. [Projet 3: Jeu de Stratégie avec IA](#projet-3-jeu-de-stratégie-avec-ia)
4. [Projet 4: Système de Recommandation](#projet-4-système-de-recommandation)
5. [Projet 5: Dashboard Analytics Temps Réel](#projet-5-dashboard-analytics-temps-réel)

---

## Projet 1: Système de Gestion de Bibliothèque

### 🎯 Objectifs Pédagogiques
- Maîtriser la programmation orientée objet
- Implémenter des structures de données complexes
- Gérer la persistance des données
- Développer une interface utilisateur
- Appliquer les algorithmes de recherche et de tri

### 📊 Niveau de Difficulté: ⭐⭐⭐ (Intermédiaire)

### 🔧 Technologies Utilisées
- **Langage**: Python
- **Base de données**: SQLite
- **Interface**: Tkinter ou Django
- **Gestion des données**: Pandas
- **Tests**: unittest

### 📋 Cahier des Charges Détaillé

#### Fonctionnalités Principales

1. **Gestion des Livres**
   - Ajouter/Modifier/Supprimer des livres
   - Recherche multicritères (titre, auteur, genre, ISBN)
   - Tri par différents champs
   - Gestion des catégories et genres

2. **Gestion des Membres**
   - Inscription/Modification/Suppression de membres
   - Historique des emprunts
   - Calcul des pénalités
   - Statuts membres (actif, suspendu, VIP)

3. **Système d'Emprunt**
   - Emprunter/Retourner des livres
   - Gestion des réservations
   - Calcul automatique des dates d'échéance
   - Notifications de rappel

4. **Rapports et Statistiques**
   - Livres les plus empruntés
   - Membres les plus actifs
   - Revenus des pénalités
   - Taux d'occupation de la bibliothèque

### 💻 Implémentation Détaillée

#### Étape 1: Architecture et Design

```python
"""
Système de Gestion de Bibliothèque
Architecture: MVC (Model-View-Controller)
"""

from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import List, Optional, Dict
import sqlite3
import uuid

@dataclass
class Livre:
    """Classe représentant un livre dans la bibliothèque"""
    isbn: str
    titre: str
    auteur: str
    genre: str
    editeur: str
    annee_publication: int
    nombre_pages: int
    nombre_exemplaires: int
    exemplaires_disponibles: int
    prix: float
    date_acquisition: datetime
    description: str = ""
    langue: str = "Français"
    etat: str = "Bon"  # Excellent, Bon, Moyen, Mauvais
    
    def __post_init__(self):
        """Validation des données après initialisation"""
        if self.nombre_exemplaires < 0:
            raise ValueError("Le nombre d'exemplaires ne peut pas être négatif")
        if self.exemplaires_disponibles > self.nombre_exemplaires:
            raise ValueError("Exemplaires disponibles > total")
        if self.annee_publication > datetime.now().year:
            raise ValueError("L'année de publication ne peut pas être dans le futur")

@dataclass
class Membre:
    """Classe représentant un membre de la bibliothèque"""
    id_membre: str
    nom: str
    prenom: str
    email: str
    telephone: str
    adresse: str
    date_inscription: datetime
    type_membre: str  # Standard, Etudiant, VIP
    statut: str = "Actif"  # Actif, Suspendu, Inactif
    limite_emprunts: int = 5
    penalites_dues: float = 0.0
    
    def __post_init__(self):
        """Génération automatique de l'ID si non fourni"""
        if not self.id_membre:
            self.id_membre = str(uuid.uuid4())[:8].upper()

@dataclass
class Emprunt:
    """Classe représentant un emprunt"""
    id_emprunt: str
    id_membre: str
    isbn_livre: str
    date_emprunt: datetime
    date_echeance: datetime
    date_retour: Optional[datetime] = None
    penalite: float = 0.0
    statut: str = "En cours"  # En cours, Retourné, En retard
    
    def __post_init__(self):
        """Calcul automatique des pénalités"""
        if not self.id_emprunt:
            self.id_emprunt = str(uuid.uuid4())[:8].upper()
        
        if self.date_retour and self.date_retour > self.date_echeance:
            jours_retard = (self.date_retour - self.date_echeance).days
            self.penalite = jours_retard * 0.5  # 0.50€ par jour de retard
            self.statut = "Retourné"
        elif datetime.now() > self.date_echeance and not self.date_retour:
            self.statut = "En retard"

class BaseDonnees:
    """Gestionnaire de base de données pour la bibliothèque"""
    
    def __init__(self, chemin_db: str = "bibliotheque.db"):
        self.chemin_db = chemin_db
        self.initialiser_db()
    
    def initialiser_db(self):
        """Créer les tables si elles n'existent pas"""
        with sqlite3.connect(self.chemin_db) as conn:
            cursor = conn.cursor()
            
            # Table des livres
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS livres (
                    isbn TEXT PRIMARY KEY,
                    titre TEXT NOT NULL,
                    auteur TEXT NOT NULL,
                    genre TEXT,
                    editeur TEXT,
                    annee_publication INTEGER,
                    nombre_pages INTEGER,
                    nombre_exemplaires INTEGER,
                    exemplaires_disponibles INTEGER,
                    prix REAL,
                    date_acquisition TEXT,
                    description TEXT,
                    langue TEXT,
                    etat TEXT
                )
            """)
            
            # Table des membres
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS membres (
                    id_membre TEXT PRIMARY KEY,
                    nom TEXT NOT NULL,
                    prenom TEXT NOT NULL,
                    email TEXT UNIQUE,
                    telephone TEXT,
                    adresse TEXT,
                    date_inscription TEXT,
                    type_membre TEXT,
                    statut TEXT,
                    limite_emprunts INTEGER,
                    penalites_dues REAL
                )
            """)
            
            # Table des emprunts
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS emprunts (
                    id_emprunt TEXT PRIMARY KEY,
                    id_membre TEXT,
                    isbn_livre TEXT,
                    date_emprunt TEXT,
                    date_echeance TEXT,
                    date_retour TEXT,
                    penalite REAL,
                    statut TEXT,
                    FOREIGN KEY (id_membre) REFERENCES membres (id_membre),
                    FOREIGN KEY (isbn_livre) REFERENCES livres (isbn)
                )
            """)
            
            conn.commit()
    
    def ajouter_livre(self, livre: Livre) -> bool:
        """Ajouter un livre à la base de données"""
        try:
            with sqlite3.connect(self.chemin_db) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO livres VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    livre.isbn, livre.titre, livre.auteur, livre.genre,
                    livre.editeur, livre.annee_publication, livre.nombre_pages,
                    livre.nombre_exemplaires, livre.exemplaires_disponibles,
                    livre.prix, livre.date_acquisition.isoformat(),
                    livre.description, livre.langue, livre.etat
                ))
                conn.commit()
                return True
        except sqlite3.IntegrityError:
            return False  # ISBN déjà existant
    
    def rechercher_livres(self, criteres: Dict[str, str]) -> List[Livre]:
        """Rechercher des livres selon différents critères"""
        with sqlite3.connect(self.chemin_db) as conn:
            cursor = conn.cursor()
            
            conditions = []
            parametres = []
            
            for champ, valeur in criteres.items():
                if valeur:
                    conditions.append(f"{champ} LIKE ?")
                    parametres.append(f"%{valeur}%")
            
            query = "SELECT * FROM livres"
            if conditions:
                query += " WHERE " + " AND ".join(conditions)
            
            cursor.execute(query, parametres)
            resultats = cursor.fetchall()
            
            livres = []
            for row in resultats:
                livre = Livre(
                    isbn=row[0], titre=row[1], auteur=row[2], genre=row[3],
                    editeur=row[4], annee_publication=row[5], nombre_pages=row[6],
                    nombre_exemplaires=row[7], exemplaires_disponibles=row[8],
                    prix=row[9], date_acquisition=datetime.fromisoformat(row[10]),
                    description=row[11], langue=row[12], etat=row[13]
                )
                livres.append(livre)
            
            return livres

class GestionnaireBibliotheque:
    """Classe principale gérant la logique métier"""
    
    def __init__(self):
        self.db = BaseDonnees()
        self.algorithmes_tri = {
            'titre': lambda livres: sorted(livres, key=lambda l: l.titre.lower()),
            'auteur': lambda livres: sorted(livres, key=lambda l: l.auteur.lower()),
            'annee': lambda livres: sorted(livres, key=lambda l: l.annee_publication, reverse=True),
            'popularite': self._trier_par_popularite
        }
    
    def _trier_par_popularite(self, livres: List[Livre]) -> List[Livre]:
        """Trier les livres par popularité (nombre d'emprunts)"""
        # Algorithme personnalisé utilisant les statistiques d'emprunt
        popularite = {}
        with sqlite3.connect(self.db.chemin_db) as conn:
            cursor = conn.cursor()
            for livre in livres:
                cursor.execute("""
                    SELECT COUNT(*) FROM emprunts WHERE isbn_livre = ?
                """, (livre.isbn,))
                popularite[livre.isbn] = cursor.fetchone()[0]
        
        return sorted(livres, key=lambda l: popularite.get(l.isbn, 0), reverse=True)
    
    def emprunter_livre(self, id_membre: str, isbn: str) -> tuple[bool, str]:
        """Effectuer un emprunt de livre"""
        with sqlite3.connect(self.db.chemin_db) as conn:
            cursor = conn.cursor()
            
            # Vérifier la disponibilité du livre
            cursor.execute("""
                SELECT exemplaires_disponibles FROM livres WHERE isbn = ?
            """, (isbn,))
            result = cursor.fetchone()
            
            if not result or result[0] <= 0:
                return False, "Livre non disponible"
            
            # Vérifier le statut du membre
            cursor.execute("""
                SELECT statut, limite_emprunts FROM membres WHERE id_membre = ?
            """, (id_membre,))
            membre_info = cursor.fetchone()
            
            if not membre_info or membre_info[0] != "Actif":
                return False, "Membre non autorisé à emprunter"
            
            # Vérifier le nombre d'emprunts en cours
            cursor.execute("""
                SELECT COUNT(*) FROM emprunts 
                WHERE id_membre = ? AND statut = 'En cours'
            """, (id_membre,))
            emprunts_actuels = cursor.fetchone()[0]
            
            if emprunts_actuels >= membre_info[1]:
                return False, "Limite d'emprunts atteinte"
            
            # Créer l'emprunt
            emprunt = Emprunt(
                id_emprunt="",
                id_membre=id_membre,
                isbn_livre=isbn,
                date_emprunt=datetime.now(),
                date_echeance=datetime.now() + timedelta(days=14)
            )
            
            # Enregistrer l'emprunt
            cursor.execute("""
                INSERT INTO emprunts VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                emprunt.id_emprunt, emprunt.id_membre, emprunt.isbn_livre,
                emprunt.date_emprunt.isoformat(), emprunt.date_echeance.isoformat(),
                None, emprunt.penalite, emprunt.statut
            ))
            
            # Mettre à jour la disponibilité
            cursor.execute("""
                UPDATE livres SET exemplaires_disponibles = exemplaires_disponibles - 1
                WHERE isbn = ?
            """, (isbn,))
            
            conn.commit()
            return True, f"Emprunt créé: {emprunt.id_emprunt}"
    
    def generer_rapport_statistiques(self) -> Dict[str, any]:
        """Générer un rapport complet des statistiques"""
        with sqlite3.connect(self.db.chemin_db) as conn:
            cursor = conn.cursor()
            
            # Statistiques générales
            cursor.execute("SELECT COUNT(*) FROM livres")
            total_livres = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM membres WHERE statut = 'Actif'")
            membres_actifs = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM emprunts WHERE statut = 'En cours'")
            emprunts_actifs = cursor.fetchone()[0]
            
            # Top 10 des livres les plus empruntés
            cursor.execute("""
                SELECT l.titre, l.auteur, COUNT(e.id_emprunt) as emprunts
                FROM livres l
                LEFT JOIN emprunts e ON l.isbn = e.isbn_livre
                GROUP BY l.isbn
                ORDER BY emprunts DESC
                LIMIT 10
            """)
            top_livres = cursor.fetchall()
            
            # Membres les plus actifs
            cursor.execute("""
                SELECT m.nom, m.prenom, COUNT(e.id_emprunt) as emprunts
                FROM membres m
                LEFT JOIN emprunts e ON m.id_membre = e.id_membre
                GROUP BY m.id_membre
                ORDER BY emprunts DESC
                LIMIT 10
            """)
            top_membres = cursor.fetchall()
            
            # Revenus des pénalités
            cursor.execute("SELECT SUM(penalite) FROM emprunts")
            revenus_penalites = cursor.fetchone()[0] or 0
            
            return {
                'total_livres': total_livres,
                'membres_actifs': membres_actifs,
                'emprunts_actifs': emprunts_actifs,
                'top_livres': top_livres,
                'top_membres': top_membres,
                'revenus_penalites': revenus_penalites,
                'taux_occupation': (emprunts_actifs / total_livres * 100) if total_livres > 0 else 0
            }

# Exemple d'utilisation et tests
if __name__ == "__main__":
    # Initialisation du système
    gestionnaire = GestionnaireBibliotheque()
    
    # Ajout de livres d'exemple
    livres_exemple = [
        Livre(
            isbn="978-2-123456-78-9",
            titre="Algorithmique et Programmation",
            auteur="Jean Dupont",
            genre="Informatique",
            editeur="TechBooks",
            annee_publication=2023,
            nombre_pages=450,
            nombre_exemplaires=3,
            exemplaires_disponibles=3,
            prix=45.99,
            date_acquisition=datetime.now(),
            description="Guide complet sur l'algorithmique moderne"
        ),
        Livre(
            isbn="978-2-987654-32-1",
            titre="Intelligence Artificielle: Concepts et Applications",
            auteur="Marie Martin",
            genre="Informatique",
            editeur="AI Press",
            annee_publication=2024,
            nombre_pages=623,
            nombre_exemplaires=2,
            exemplaires_disponibles=2,
            prix=67.50,
            date_acquisition=datetime.now(),
            description="Exploration approfondie de l'IA moderne"
        )
    ]
    
    for livre in livres_exemple:
        succes = gestionnaire.db.ajouter_livre(livre)
        print(f"Ajout du livre '{livre.titre}': {'✓' if succes else '✗'}")
    
    # Test de recherche
    resultats = gestionnaire.db.rechercher_livres({'genre': 'Informatique'})
    print(f"\nLivres d'informatique trouvés: {len(resultats)}")
    
    # Génération de rapport
    rapport = gestionnaire.generer_rapport_statistiques()
    print(f"\nRapport statistiques:")
    print(f"- Total livres: {rapport['total_livres']}")
    print(f"- Membres actifs: {rapport['membres_actifs']}")
    print(f"- Taux d'occupation: {rapport['taux_occupation']:.1f}%")
```

#### Étape 2: Interface Utilisateur

```python
"""
Interface utilisateur avec Tkinter pour le système de bibliothèque
"""

import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
from tkinter.scrolledtext import ScrolledText
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import pandas as pd

class InterfaceBibliotheque:
    """Interface graphique principale"""
    
    def __init__(self):
        self.gestionnaire = GestionnaireBibliotheque()
        self.fenetre = tk.Tk()
        self.fenetre.title("Système de Gestion de Bibliothèque")
        self.fenetre.geometry("1200x800")
        self.fenetre.configure(bg='#f0f0f0')
        
        self.creer_interface()
        self.charger_donnees()
    
    def creer_interface(self):
        """Créer l'interface utilisateur complète"""
        # Menu principal
        menubar = tk.Menu(self.fenetre)
        self.fenetre.config(menu=menubar)
        
        # Menu Fichier
        menu_fichier = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Fichier", menu=menu_fichier)
        menu_fichier.add_command(label="Exporter données", command=self.exporter_donnees)
        menu_fichier.add_command(label="Importer données", command=self.importer_donnees)
        menu_fichier.add_separator()
        menu_fichier.add_command(label="Quitter", command=self.fenetre.quit)
        
        # Menu Rapports
        menu_rapports = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Rapports", menu=menu_rapports)
        menu_rapports.add_command(label="Statistiques générales", command=self.afficher_statistiques)
        menu_rapports.add_command(label="Livres populaires", command=self.rapport_livres_populaires)
        menu_rapports.add_command(label="Membres actifs", command=self.rapport_membres_actifs)
        
        # Notebook pour les onglets
        self.notebook = ttk.Notebook(self.fenetre)
        self.notebook.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Onglets
        self.creer_onglet_livres()
        self.creer_onglet_membres()
        self.creer_onglet_emprunts()
        self.creer_onglet_recherche()
        self.creer_onglet_statistiques()
    
    def creer_onglet_livres(self):
        """Créer l'onglet de gestion des livres"""
        frame_livres = ttk.Frame(self.notebook)
        self.notebook.add(frame_livres, text="📚 Livres")
        
        # Frame pour les boutons
        frame_boutons = ttk.Frame(frame_livres)
        frame_boutons.pack(fill='x', padx=5, pady=5)
        
        ttk.Button(frame_boutons, text="➕ Ajouter Livre", 
                  command=self.ajouter_livre).pack(side='left', padx=5)
        ttk.Button(frame_boutons, text="✏️ Modifier Livre", 
                  command=self.modifier_livre).pack(side='left', padx=5)
        ttk.Button(frame_boutons, text="🗑️ Supprimer Livre", 
                  command=self.supprimer_livre).pack(side='left', padx=5)
        ttk.Button(frame_boutons, text="🔄 Actualiser", 
                  command=self.actualiser_livres).pack(side='left', padx=5)
        
        # Tri
        ttk.Label(frame_boutons, text="Trier par:").pack(side='left', padx=(20, 5))
        self.combo_tri_livres = ttk.Combobox(frame_boutons, 
                                           values=["Titre", "Auteur", "Année", "Popularité"],
                                           state="readonly", width=12)
        self.combo_tri_livres.set("Titre")
        self.combo_tri_livres.pack(side='left', padx=5)
        self.combo_tri_livres.bind('<<ComboboxSelected>>', self.trier_livres)
        
        # Tableau des livres
        colonnes = ('ISBN', 'Titre', 'Auteur', 'Genre', 'Année', 'Disponibles/Total', 'Prix')
        self.tree_livres = ttk.Treeview(frame_livres, columns=colonnes, show='headings', height=20)
        
        for col in colonnes:
            self.tree_livres.heading(col, text=col)
            self.tree_livres.column(col, width=120)
        
        # Scrollbar
        scrollbar_livres = ttk.Scrollbar(frame_livres, orient='vertical', command=self.tree_livres.yview)
        self.tree_livres.configure(yscrollcommand=scrollbar_livres.set)
        
        self.tree_livres.pack(side='left', fill='both', expand=True, padx=(5, 0), pady=5)
        scrollbar_livres.pack(side='right', fill='y', pady=5)
    
    def ajouter_livre(self):
        """Dialogue pour ajouter un nouveau livre"""
        dialog = tk.Toplevel(self.fenetre)
        dialog.title("Ajouter un Livre")
        dialog.geometry("500x600")
        dialog.resizable(False, False)
        
        # Variables pour les champs
        vars_livre = {
            'isbn': tk.StringVar(),
            'titre': tk.StringVar(),
            'auteur': tk.StringVar(),
            'genre': tk.StringVar(),
            'editeur': tk.StringVar(),
            'annee': tk.IntVar(value=2024),
            'pages': tk.IntVar(value=200),
            'exemplaires': tk.IntVar(value=1),
            'prix': tk.DoubleVar(value=20.0),
            'langue': tk.StringVar(value="Français"),
            'etat': tk.StringVar(value="Bon")
        }
        
        # Création des champs
        row = 0
        for label, var in vars_livre.items():
            ttk.Label(dialog, text=f"{label.title()}:").grid(row=row, column=0, 
                                                            sticky='w', padx=10, pady=5)
            
            if label == 'genre':
                combo = ttk.Combobox(dialog, textvariable=var, width=30,
                                   values=["Informatique", "Mathématiques", "Physique", 
                                          "Littérature", "Histoire", "Philosophie", "Autre"])
                combo.grid(row=row, column=1, padx=10, pady=5)
            elif label == 'langue':
                combo = ttk.Combobox(dialog, textvariable=var, width=30,
                                   values=["Français", "Anglais", "Espagnol", "Allemand", "Autre"])
                combo.grid(row=row, column=1, padx=10, pady=5)
            elif label == 'etat':
                combo = ttk.Combobox(dialog, textvariable=var, width=30,
                                   values=["Excellent", "Bon", "Moyen", "Mauvais"])
                combo.grid(row=row, column=1, padx=10, pady=5)
            else:
                entry = ttk.Entry(dialog, textvariable=var, width=32)
                entry.grid(row=row, column=1, padx=10, pady=5)
            
            row += 1
        
        # Zone de description
        ttk.Label(dialog, text="Description:").grid(row=row, column=0, sticky='nw', padx=10, pady=5)
        text_description = ScrolledText(dialog, width=35, height=5)
        text_description.grid(row=row, column=1, padx=10, pady=5)
        row += 1
        
        # Boutons
        frame_boutons = ttk.Frame(dialog)
        frame_boutons.grid(row=row, column=0, columnspan=2, pady=20)
        
        def valider():
            try:
                livre = Livre(
                    isbn=vars_livre['isbn'].get(),
                    titre=vars_livre['titre'].get(),
                    auteur=vars_livre['auteur'].get(),
                    genre=vars_livre['genre'].get(),
                    editeur=vars_livre['editeur'].get(),
                    annee_publication=vars_livre['annee'].get(),
                    nombre_pages=vars_livre['pages'].get(),
                    nombre_exemplaires=vars_livre['exemplaires'].get(),
                    exemplaires_disponibles=vars_livre['exemplaires'].get(),
                    prix=vars_livre['prix'].get(),
                    date_acquisition=datetime.now(),
                    description=text_description.get(1.0, tk.END).strip(),
                    langue=vars_livre['langue'].get(),
                    etat=vars_livre['etat'].get()
                )
                
                if self.gestionnaire.db.ajouter_livre(livre):
                    messagebox.showinfo("Succès", "Livre ajouté avec succès!")
                    dialog.destroy()
                    self.actualiser_livres()
                else:
                    messagebox.showerror("Erreur", "ISBN déjà existant ou erreur de saisie")
                    
            except Exception as e:
                messagebox.showerror("Erreur", f"Erreur lors de l'ajout: {str(e)}")
        
        ttk.Button(frame_boutons, text="✓ Valider", command=valider).pack(side='left', padx=10)
        ttk.Button(frame_boutons, text="✗ Annuler", command=dialog.destroy).pack(side='left', padx=10)
    
    def afficher_statistiques(self):
        """Afficher une fenêtre avec les statistiques détaillées"""
        stats_window = tk.Toplevel(self.fenetre)
        stats_window.title("📊 Statistiques de la Bibliothèque")
        stats_window.geometry("800x600")
        
        rapport = self.gestionnaire.generer_rapport_statistiques()
        
        # Frame principal avec scrollbar
        main_frame = ttk.Frame(stats_window)
        main_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Statistiques générales
        general_frame = ttk.LabelFrame(main_frame, text="📈 Statistiques Générales", padding=10)
        general_frame.pack(fill='x', pady=(0, 10))
        
        stats_text = f"""
        📚 Total des livres: {rapport['total_livres']}
        👥 Membres actifs: {rapport['membres_actifs']}
        📖 Emprunts en cours: {rapport['emprunts_actifs']}
        💰 Revenus des pénalités: {rapport['revenus_penalites']:.2f}€
        📊 Taux d'occupation: {rapport['taux_occupation']:.1f}%
        """
        
        ttk.Label(general_frame, text=stats_text, font=('Arial', 12)).pack()
        
        # Top livres
        top_livres_frame = ttk.LabelFrame(main_frame, text="🏆 Top 10 des Livres les Plus Empruntés", padding=10)
        top_livres_frame.pack(fill='both', expand=True, pady=(0, 10))
        
        tree_top_livres = ttk.Treeview(top_livres_frame, columns=('Titre', 'Auteur', 'Emprunts'), 
                                      show='headings', height=8)
        tree_top_livres.heading('Titre', text='Titre')
        tree_top_livres.heading('Auteur', text='Auteur')
        tree_top_livres.heading('Emprunts', text='Emprunts')
        
        for livre in rapport['top_livres']:
            tree_top_livres.insert('', 'end', values=livre)
        
        tree_top_livres.pack(fill='both', expand=True)
        
        # Graphique avec matplotlib
        graph_frame = ttk.LabelFrame(main_frame, text="📊 Graphique des Emprunts", padding=10)
        graph_frame.pack(fill='both', expand=True)
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
        
        # Graphique en barres des top livres
        if rapport['top_livres']:
            titres = [livre[0][:20] + '...' if len(livre[0]) > 20 else livre[0] 
                     for livre in rapport['top_livres'][:5]]
            emprunts = [livre[2] for livre in rapport['top_livres'][:5]]
            
            ax1.bar(range(len(titres)), emprunts, color='skyblue')
            ax1.set_title('Top 5 Livres les Plus Empruntés')
            ax1.set_xticks(range(len(titres)))
            ax1.set_xticklabels(titres, rotation=45, ha='right')
            ax1.set_ylabel('Nombre d\'emprunts')
        
        # Graphique circulaire du statut des livres
        statuts = ['Disponibles', 'Empruntés']
        total_exemplaires = rapport['total_livres']  # Simplifié pour l'exemple
        empruntes = rapport['emprunts_actifs']
        disponibles = total_exemplaires - empruntes
        
        if total_exemplaires > 0:
            ax2.pie([disponibles, empruntes], labels=statuts, autopct='%1.1f%%', 
                   colors=['lightgreen', 'lightcoral'])
            ax2.set_title('Répartition des Livres')
        
        plt.tight_layout()
        
        canvas = FigureCanvasTkAgg(fig, graph_frame)
        canvas.draw()
        canvas.get_tk_widget().pack(fill='both', expand=True)
    
    def charger_donnees(self):
        """Charger les données initiales"""
        self.actualiser_livres()
    
    def actualiser_livres(self):
        """Actualiser la liste des livres"""
        # Effacer les données existantes
        for item in self.tree_livres.get_children():
            self.tree_livres.delete(item)
        
        # Charger tous les livres
        livres = self.gestionnaire.db.rechercher_livres({})
        
        # Appliquer le tri
        tri_selectionne = self.combo_tri_livres.get().lower()
        if tri_selectionne in self.gestionnaire.algorithmes_tri:
            livres = self.gestionnaire.algorithmes_tri[tri_selectionne](livres)
        
        # Ajouter au tableau
        for livre in livres:
            self.tree_livres.insert('', 'end', values=(
                livre.isbn,
                livre.titre,
                livre.auteur,
                livre.genre,
                livre.annee_publication,
                f"{livre.exemplaires_disponibles}/{livre.nombre_exemplaires}",
                f"{livre.prix:.2f}€"
            ))
    
    def trier_livres(self, event=None):
        """Appliquer le tri sélectionné"""
        self.actualiser_livres()
    
    def executer(self):
        """Lancer l'interface"""
        self.fenetre.mainloop()

# Point d'entrée principal
if __name__ == "__main__":
    app = InterfaceBibliotheque()
    app.executer()
```

### 📝 Exercices et Défis

#### Niveau Débutant
1. **Validation des données**: Ajouter des validations plus strictes pour les champs de saisie
2. **Interface améliorée**: Améliorer l'ergonomie de l'interface utilisateur
3. **Recherche avancée**: Implémenter une recherche avec plusieurs critères simultanés

#### Niveau Intermédiaire  
4. **Système de réservation**: Permettre aux membres de réserver des livres non disponibles
5. **Notifications**: Envoyer des rappels automatiques par email pour les retours
6. **Import/Export**: Gérer l'importation de données depuis des fichiers CSV/Excel

#### Niveau Avancé
7. **API REST**: Créer une API REST pour accéder au système à distance
8. **Recommandations**: Implémenter un système de recommandation basé sur l'historique
9. **Analytics avancés**: Ajouter des analyses prédictives sur les tendances d'emprunt

### 🎯 Critères d'évaluation

- **Fonctionnalité** (30%): Toutes les fonctionnalités demandées sont implémentées
- **Code Quality** (25%): Code bien structuré, commenté et respectant les bonnes pratiques
- **Interface Utilisateur** (20%): Interface intuitive et ergonomique
- **Gestion des erreurs** (15%): Gestion robuste des cas d'erreur
- **Performance** (10%): Optimisation des requêtes et de la réactivité

### 📚 Ressources Complémentaires

1. **Documentation Python**: sqlite3, tkinter, datetime
2. **Patterns de conception**: MVC, DAO, Observer
3. **Bases de données**: Normalisation, index, requêtes optimisées
4. **Tests unitaires**: unittest, mock, TDD

---

*Ce projet représente un cas d'étude complet permettant d'appliquer de nombreux concepts de programmation dans un contexte réel et professionnel.*