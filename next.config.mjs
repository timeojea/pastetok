/** @type {import('next').NextConfig} */
// Export 100 % statique pour GitHub Pages (servi sous /pastetok).
// Pas de serveur : l'API tikwm et le CDN TikTok autorisent le CORS, tout se fait côté navigateur.
const nextConfig = {
  output: 'export',
  basePath: '/pastetok',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
