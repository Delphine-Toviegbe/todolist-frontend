# HDM Todo App – Frontend

Frontend de l’application web **Todo List** développée avec **React**, **TypeScript** et **Material UI**.  
Ce projet interagit avec un backend NestJS via une API REST pour gérer des tâches.

---

## Choix technique

| Technologie     | Rôle                                                                 |
|----------------|----------------------------------------------------------------------|
| **React**       | Bibliothèque JavaScript pour construire l’interface utilisateur     |
| **TypeScript**  | Superset de JavaScript pour ajouter un typage statique              |
| **MUI (Material UI)** | Framework UI pour un design propre, réactif et rapide à implémenter |
| **React Hook Form** | Gestion efficace et typée des formulaires                        |

---

## Installation & Démarrage

1. Cloner le dépôt

```bash
    git clone https://github.com/Delphine-Toviegbe/todolist-frontend.git
    cd todolist-frontend
```

2. Installer les dépendances

```bash
    yarn install
    # ou
    npm install
```

3. Lancer le serveur de développement

```bash
    yarn dev
    # ou
    npm run dev
```

L'application sera disponible sur http://localhost:5173/ (ou autre port selon config Vite).

    Assurez-vous que le backend NestJS soit en cours d'exécution avant de lancer le frontend. L’URL de l’API peut être ajustée dans src/services/api.ts.

. Fonctionnalités

    - Liste des tâches (affichage depuis l’API)

    - Création de tâche via formulaire

    - Modification de tâche avec pré-remplissage

    - Suppression d’une tâche

Structure du front du projet

  src/
  ├── components/
      ├── App.tsx         # Point d’entrée principal  
      ├── TodoPage.tsx    # Point d’entrée principal 
  ├── hooks/              # Hooks personnalisés 
  └── main.tsx            # Configuration Vite + React


