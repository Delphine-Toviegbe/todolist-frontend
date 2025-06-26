
# HDM Todo App – Frontend

Frontend de l’application **Todo List** développée avec **React**, **TypeScript** et **Material UI (MUI)**.  
Ce projet consomme une API REST exposée par un backend NestJS pour gérer les tâches à effectuer.

---

## Choix techniques

- **React** : Bibliothèque JavaScript pour construire des interfaces interactives et réactives.
- **TypeScript** : Apporte un typage statique robuste au code JavaScript, améliorant la fiabilité.
- **Material UI (MUI)** : Framework de composants UI pour créer rapidement une interface élégante et responsive.
- **React Hook Form** : Permet une gestion légère, performante et typée des formulaires.

---

## Installation

## 1. Cloner le dépôt

```bash
    git clone https://github.com/Delphine-Toviegbe/todolist-frontend.git
    cd todolist-frontend
```

### 2. Installer les dépendances

```bash
    yarn install
    # ou
    npm install
```

### 3. Lancer le serveur de développement

```bash
    yarn dev
    # ou
    npm run dev
```

L'application sera accessible par défaut à l'adresse :
[http://localhost:5173/](http://localhost:5173/)

    Assurez-vous que le backend soit lancé avant de démarrer le frontend.

---

## Fonctionnalités implémentées

* Affichage de la liste des tâches
* Création de tâche via un formulaire
* Modification d’une tâche existante
* Suppression d’une tâche

---

## Structure du projet

```
src/
├── components/
│   ├── App.tsx          # Composant principal
│   └── TodoPage.tsx     # Page contenant la logique Todo
├── hooks/               # Hooks personnalisés
└── main.tsx             # Point d’entrée de l’application (React + Vite)
```

---

## Difficultés rencontrées

* **Compréhension du code existant** : L’architecture et la logique étaient déjà en place. J’ai pris le temps d’identifier les composants et la gestion de l’état pour intégrer les fonctionnalités demandées proprement.
* **Connexion avec l’API** : Des ajustements ont été nécessaires dans les appels à l’API, notamment pour s’aligner avec les routes disponibles côté backend.
* **Typage TypeScript** : Une attention particulière a été portée à la cohérence du typage lors de la manipulation des tâches dans les formulaires et les composants.

