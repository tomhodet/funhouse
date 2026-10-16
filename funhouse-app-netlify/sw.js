/* Fun House · service worker : le livret reste consultable sans réseau après la première ouverture.
   Changer VERSION à chaque mise à jour du contenu pour forcer le rafraîchissement. */
const VERSION = 'funhouse-v1';
const COEUR = [
  './', 'index.html', 'styles.css', 'app.js', 'content.js', 'cle.js', 'qrcode.min.js', 'manifest.webmanifest',
  'fonts/playfair-display-latin-500-normal.woff2', 'fonts/playfair-display-latin-500-italic.woff2',
  'fonts/montserrat-latin-400-normal.woff2', 'fonts/montserrat-latin-500-normal.woff2', 'fonts/satisfy-latin-400-normal.woff2',
  'img/logo-cdm.png', 'video/hero-poster.webp', 'img/maison.webp', 'img/gunners.webp', 'img/platine-vinyle-s.webp'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(COEUR)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.destination === 'video') return;                       /* la vidéo passe en direct (requêtes partielles) */
  const nav = req.mode === 'navigate' || /\.(html|js|json|webmanifest)$/.test(new URL(req.url).pathname) || new URL(req.url).pathname.endsWith('/');
  if (nav) {
    /* réseau d'abord, cache en secours : les mises à jour arrivent tout de suite */
    e.respondWith(fetch(req).then((r) => { const copie = r.clone(); caches.open(VERSION).then((c) => c.put(req, copie)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match('index.html'))));
  } else {
    /* cache d'abord, puis réseau : images, polices, styles */
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => { const copie = res.clone(); caches.open(VERSION).then((c) => c.put(req, copie)); return res; })));
  }
});
