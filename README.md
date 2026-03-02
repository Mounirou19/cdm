# CDM 2026 - Coupe du Monde FIFA

Application web full-stack de suivi en temps réel de la Coupe du Monde FIFA 2026 (USA / Mexique / Canada).

## Stack technique

- **Frontend** : Next.js 14 (App Router) · TypeScript · Tailwind CSS
- **Backend** : Express.js · TypeScript
- **Base de données** : MySQL 8.0 · Prisma ORM
- **Temps réel** : Socket.io
- **Monorepo** : pnpm workspaces

## Démarrage rapide (Docker)

Le seul prérequis est [Docker](https://www.docker.com/) (avec Docker Compose).

```bash
docker compose up --build
```

C'est tout ! Docker lance automatiquement :

| Service     | URL                          | Description                           |
|-------------|------------------------------|---------------------------------------|
| Frontend    | http://localhost:3000         | Application Next.js                   |
| Backend API | http://localhost:4000/api/v1  | API Express + Socket.io               |
| phpMyAdmin  | http://localhost:8080         | Interface visuelle BDD (root/password)|
| MySQL 8.0   | `localhost:3306`             | Base de données                       |

Le backend attend MySQL, applique les migrations et seed la base automatiquement.

```bash
# Relance rapide (images déjà buildées)
docker compose up

# Tout supprimer (conteneurs + données)
docker compose down -v
```

## Démarrage sans Docker (développement)

### Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8
- MySQL 8.0 (via Docker ou installation locale)

### 1. Installer les dépendances

```bash
pnpm install
```

### 2. Lancer MySQL

```bash
docker compose up mysql -d
```

### 3. Initialiser la base de données

```bash
cd apps/backend
pnpm exec prisma migrate dev
pnpm exec prisma db seed
cd ../..
```

### 4. Lancer l'application

```bash
pnpm dev
```

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:3000       |
| Backend  | http://localhost:4000       |
| API      | http://localhost:4000/api/v1 |

## Structure du projet

```
cdm-2026/
├── packages/shared/          # Types TypeScript partagés
├── apps/
│   ├── backend/              # API Express + Socket.io + Prisma
│   │   ├── prisma/           # Schema, migrations, seed
│   │   └── src/
│   │       ├── config/       # Base de données, variables d'env
│   │       ├── middleware/    # Helmet, CORS, rate-limit, validation
│   │       ├── routes/       # Définition des endpoints REST
│   │       ├── controllers/  # Gestionnaires de requêtes
│   │       ├── services/     # Logique métier
│   │       └── adapters/     # Adaptateur football-data.org
│   └── frontend/             # Application Next.js
│       └── src/
│           ├── app/          # Pages (App Router)
│           ├── components/   # Composants UI
│           ├── hooks/        # Hooks (useFetch, useSocket, useMatchUpdates)
│           ├── lib/          # Clients API et WebSocket
│           └── providers/    # Providers (Socket, SWR)
└── docs/                     # Documentation (UML, MERISE, specs)
```

## Pages disponibles

| Route              | Description                          |
|--------------------|--------------------------------------|
| `/`                | Tableau de bord (matchs en direct + du jour) |
| `/matches`         | Tous les matchs (avec filtres)       |
| `/matches/[id]`    | Détail d'un match + événements       |
| `/groups`          | 12 groupes avec classements          |
| `/groups/[name]`   | Détail d'un groupe + matchs          |
| `/teams`           | 48 équipes                           |
| `/teams/[id]`      | Fiche équipe + ses matchs            |
| `/phases/[slug]`   | Matchs par phase de compétition      |
| `/bracket`         | Tableau des éliminatoires            |
| `/stadiums`        | Liste des 16 stades                  |

## Endpoints API

Base : `http://localhost:4000/api/v1`

| Méthode | Endpoint                     | Description                    |
|---------|------------------------------|--------------------------------|
| GET     | `/matches`                   | Tous les matchs (filtrable)    |
| GET     | `/matches/live`              | Matchs en direct               |
| GET     | `/matches/today`             | Matchs du jour                 |
| GET     | `/matches/:id`               | Détail d'un match              |
| GET     | `/matches/:id/events`        | Événements d'un match          |
| GET     | `/teams`                     | Toutes les équipes             |
| GET     | `/teams/:id`                 | Détail d'une équipe            |
| GET     | `/teams/:id/matches`         | Matchs d'une équipe            |
| GET     | `/groups`                    | Tous les groupes + classements |
| GET     | `/groups/:name`              | Détail d'un groupe             |
| GET     | `/groups/:name/standings`    | Classement d'un groupe         |
| GET     | `/groups/:name/matches`      | Matchs d'un groupe             |
| GET     | `/phases`                    | Liste des phases               |
| GET     | `/phases/:slug/matches`      | Matchs d'une phase             |
| GET     | `/stadiums`                  | Tous les stades                |
| GET     | `/standings`                 | Classements de tous les groupes|
| POST    | `/sync/matches`              | Déclencher la synchronisation  |
| POST    | `/sync/standings`            | Recalculer les classements     |

## Variables d'environnement

### Backend (`apps/backend/.env`)

| Variable               | Défaut                                           | Description                |
|------------------------|--------------------------------------------------|----------------------------|
| `DATABASE_URL`         | `mysql://root:password@localhost:3306/cdm_2026`  | URL de connexion MySQL     |
| `PORT`                 | `4000`                                           | Port du serveur            |
| `CORS_ORIGIN`          | `http://localhost:3000`                          | Origine autorisée (CORS)   |
| `FOOTBALL_DATA_API_KEY`| *(vide)*                                         | Clé API football-data.org  |
| `NODE_ENV`             | `development`                                    | Environnement              |

### Frontend (`apps/frontend/.env.local`)

| Variable                 | Défaut                              | Description           |
|--------------------------|-------------------------------------|-----------------------|
| `NEXT_PUBLIC_API_URL`    | `http://localhost:4000/api/v1`      | URL de l'API backend  |
| `NEXT_PUBLIC_SOCKET_URL` | `http://localhost:4000`             | URL du serveur Socket |

## Données en temps réel (API football-data.org)

Par défaut, l'application fonctionne avec les **données locales** (seed). Pour activer la synchronisation en temps réel avec des scores live, il faut connecter l'API [football-data.org](https://www.football-data.org/) :

### 1. Créer un compte

Aller sur [https://www.football-data.org/client/register](https://www.football-data.org/client/register) et créer un compte gratuit.

### 2. Récupérer la clé API

Une fois connecté, la clé API est visible sur le dashboard du compte (section "API Token").

### 3. Configurer la clé

Ouvrir `apps/backend/.env` et remplir la variable :

```env
FOOTBALL_DATA_API_KEY="ta-cle-api-ici"
```

### 4. Relancer le backend

```bash
pnpm dev
```

Le backend va maintenant :
- Interroger l'API externe pour récupérer les scores en direct
- Comparer avec la base de données et mettre à jour les changements
- Émettre les mises à jour via Socket.io vers tous les clients connectés
- Recalculer automatiquement les classements quand un match se termine

> Sans clé API, tout fonctionne normalement — l'app utilise simplement les données du seed en base. La clé est optionnelle.

## Commandes utiles

```bash
# Installer les dépendances
pnpm install

# Lancer en développement (frontend + backend)
pnpm dev

# Build de production
pnpm build

# Prisma : générer le client
cd apps/backend && pnpm exec prisma generate

# Prisma : créer une migration
cd apps/backend && pnpm exec prisma migrate dev --name nom_migration

# Prisma : relancer le seed
cd apps/backend && pnpm exec prisma db seed

# Prisma : ouvrir Prisma Studio (interface visuelle)
cd apps/backend && pnpm exec prisma studio

# Arrêter MySQL
docker compose down
```
