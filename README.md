# PasteTok

Téléchargeur de vidéos TikTok : MP4 sans filigrane, avec filigrane, ou MP3. Gratuit, sans inscription, sans pub, sans cookie.

**▶ [timeojea.github.io/pastetok](https://timeojea.github.io/pastetok/)**

## Comment ça marche

Site **100 % statique** (export Next.js) hébergé sur GitHub Pages. Pas de serveur, pas de base de données : tout se passe dans le navigateur.

1. L'URL TikTok collée est validée côté client (domaines TikTok uniquement).
2. Le navigateur appelle l'API publique [tikwm.com](https://www.tikwm.com) (sans clé, CORS ouvert) pour obtenir les liens MP4/MP3.
3. Le fichier est récupéré directement depuis le CDN TikTok (CORS ouvert) puis enregistré via `fetch → blob → <a download>`. Si le fetch échoue, le lien s'ouvre dans un nouvel onglet.

## Stack

- **Next.js 14** (App Router, `output: 'export'`) + TypeScript
- **Tailwind CSS**, **lucide-react**
- **tikwm.com** (extraction des liens vidéo)
- **GitHub Pages** + GitHub Actions (déploiement à chaque push sur `main`)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000/pastetok](http://localhost:3000/pastetok) (le site est servi sous le `basePath` `/pastetok`).

`npm run build` génère le site statique dans `out/`.

### Variables d'environnement (optionnelles)

| Variable | Défaut |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://timeojea.github.io/pastetok` |
| `NEXT_PUBLIC_SITE_NAME` | `PasteTok` |

Pour un fork servi sous un autre chemin, adapter `basePath` dans `next.config.mjs`.

## Pages

| Route | Description |
|---|---|
| `/` | Accueil, saisie de l'URL TikTok |
| `/download` | Aperçu + choix du format |
| `/contact` | Renvoie vers les issues GitHub |
| `/mentions-legales`, `/cgu`, `/politique-de-confidentialite` | Pages légales |

## Structure

```
├── app/              — Pages (App Router) + sitemap
├── components/
│   ├── layout/       — Header, Footer
│   ├── home/         — Hero, HowItWorks, FAQ
│   └── download/     — VideoPreview, DownloadOptions
├── lib/
│   ├── tiktok.ts     — Client tikwm.com + téléchargement (changer de fournisseur ici)
│   └── security.ts   — Validation d'URL, nettoyage des entrées
└── .github/workflows/deploy.yml — Build + déploiement GitHub Pages
```

## Limites

- Dépend de **tikwm.com** : si l'API tombe, change ses règles CORS ou devient payante, le site ne fonctionne plus.
- Les vidéos restent la propriété de leurs créateurs. Outil destiné à un usage personnel : respectez les droits d'auteur et les conditions de TikTok.

## Contribuer

Issues et pull requests bienvenues.

## Licence

[MIT](LICENSE) © Timéo Jeannin
