# PasteTok

Plateforme web de téléchargement de vidéos TikTok, monétisée par Adsterra.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **Prisma** + SQLite (analytics, rate limiting)
- **tikwm.com** API (récupération vidéos TikTok, sans clé)
- **Adsterra** (monétisation publicitaire)

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 3. Initialiser la base de données
npx prisma db push

# 4. Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Configuration

### Variables d'environnement (`.env`)

| Variable | Description | Obligatoire |
|---|---|---|
| `DATABASE_URL` | Chemin SQLite (`file:./dev.db`) | Oui |
| `ADMIN_PASSWORD` | Mot de passe dashboard `/admin` | Oui |
| `NEXT_PUBLIC_SITE_URL` | URL du site en production | Oui |
| `IP_HASH_SALT` | Salt pour le hashage des IPs | Oui |
| `NEXT_PUBLIC_ADSTERRA_BANNER_HEADER` | Zone ID bannière 728×90 (header) | Non |
| `NEXT_PUBLIC_ADSTERRA_BANNER_SIDEBAR` | Zone ID bannière 300×250 (sidebar) | Non |
| `NEXT_PUBLIC_ADSTERRA_NATIVE_HOME` | Zone ID native ad (accueil) | Non |
| `NEXT_PUBLIC_ADSTERRA_POPUNDER` | Zone ID popunder | Non |
| `NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR` | Zone ID social bar (interstitiel) | Non |

> Les zones Adsterra vides sont simplement ignorées — aucune pub ne s'affiche.

### Configurer Adsterra

1. Créer un compte sur [adsterra.com](https://adsterra.com)
2. Créer des zones publicitaires (Banner, Native, Popunder, Social Bar)
3. Copier les **Zone IDs** dans `.env`

## Pages

| Route | Description |
|---|---|
| `/` | Accueil — saisie URL TikTok |
| `/download` | Résultat — aperçu + options de téléchargement |
| `/admin` | Dashboard analytics (protégé par mot de passe) |
| `/contact` | Formulaire de contact |
| `/mentions-legales` | Mentions légales |
| `/cgu` | Conditions générales d'utilisation |
| `/politique-de-confidentialite` | Politique de confidentialité RGPD |

## API

| Route | Méthode | Description |
|---|---|---|
| `/api/download` | `POST` | Récupère les métadonnées d'une vidéo TikTok |
| `/api/proxy` | `GET` | Proxy de téléchargement (évite les erreurs CORS) |
| `/api/stats` | `GET` | Statistiques admin (Bearer token requis) |
| `/api/contact` | `POST` | Réception des messages du formulaire |

### Exemple `/api/download`

```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.tiktok.com/@user/video/123"}'
```

## Sécurité

- Validation stricte des URLs (domaines TikTok uniquement)
- Rate limiting : **20 requêtes/heure** par IP
- IPs hashées via HMAC-SHA256 (jamais stockées en clair)
- Headers de sécurité : CSP, X-Frame-Options, X-Content-Type-Options
- Inputs sanitisés côté serveur

## Déploiement

### Vercel

```bash
npm i -g vercel
vercel --prod
```

Ajouter les variables d'environnement dans le dashboard Vercel.

> **Note SQLite + Vercel :** SQLite ne persiste pas entre les déploiements sur Vercel (filesystem éphémère). Pour la production, migrer vers **Turso** (SQLite distribué) ou **PostgreSQL** (Neon, Supabase).

### VPS (Ubuntu)

```bash
# Build
npm run build

# Démarrer avec PM2
npm install -g pm2
pm2 start npm --name "pastetok" -- start
pm2 save && pm2 startup
```

Configurer un reverse proxy Nginx sur le port 3000.

## Structure des fichiers

```
├── app/
│   ├── api/          — Routes API (download, proxy, stats, contact)
│   ├── download/     — Page résultat
│   ├── admin/        — Dashboard analytics
│   └── ...           — Pages statiques (CGU, mentions, etc.)
├── components/
│   ├── ads/          — Composants publicitaires Adsterra
│   ├── layout/       — Header, Footer
│   ├── home/         — Hero, HowItWorks, FAQ
│   └── download/     — VideoPreview, DownloadOptions, AdInterstitial
├── lib/
│   ├── adsterra.ts   — Config centralisée zones Adsterra
│   ├── tiktok.ts     — Client API tikwm.com
│   ├── rate-limit.ts — Rate limiting par IP
│   ├── security.ts   — Validation, hashage, sanitization
│   └── db.ts         — Singleton Prisma
└── prisma/
    └── schema.prisma — Modèles Download + RateLimit
```

## Licence

Usage personnel. Les vidéos TikTok restent la propriété de leurs créateurs.
