/* Ancienne version du livret : ce service worker vide les caches, se désinscrit et renvoie vers la nouvelle adresse. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const cles = await caches.keys();
    await Promise.all(cles.filter((k) => k.startsWith('funhouse-v1')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const fenetres = await self.clients.matchAll({ type: 'window' });
    const cible = new URL('../', self.location).href;
    fenetres.forEach((c) => { try { c.navigate(cible); } catch (err) { } });
  })());
});
