/* Fun House · service worker v2 : le livret reste consultable sans réseau après la première ouverture.
   Pages, styles et scripts : réseau d'abord (les mises à jour arrivent tout de suite).
   Images et polices : cache d'abord.
   Changer VERSION à chaque mise à jour pour nettoyer l'ancien cache. */
const VERSION = 'funhouse-v3';
const COEUR = [
  './', 'index.html', 'styles.css?v=3', 'app.js?v=3', 'content.js?v=3', 'cle.js', 'qrcode.min.js', 'manifest.webmanifest',
  'fonts/playfair-display-latin-500-normal.woff2', 'fonts/playfair-display-latin-500-italic.woff2',
  'fonts/montserrat-latin-400-normal.woff2', 'fonts/montserrat-latin-500-normal.woff2', 'fonts/satisfy-latin-400-normal.woff2',
  'img/logo-cdm.png', 'img/hero-billard.webp', 'img/hero-bougies.webp', 'img/hero-guitares.webp'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(COEUR)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const reseauDabord = req.mode === 'navigate' || /\.(html|js|css|json|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  if (reseauDabord) {
    e.respondWith(fetch(req).then((r) => { const copie = r.clone(); caches.open(VERSION).then((c) => c.put(req, copie)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match('index.html'))));
  } else {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => { const copie = res.clone(); caches.open(VERSION).then((c) => c.put(req, copie)); return res; })));
  }
});
