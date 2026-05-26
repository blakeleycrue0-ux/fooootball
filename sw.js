const CACHE = 'fsp-v1';
const ARCHIVOS = [
  '/home.html',
  '/equipos.html',
  '/inscripcion.html',
  '/infantil.html',
  '/Logoclub.png',
  '/palmaflooring.png',
  '/universalnautic.png',
  '/instagram.png',
  '/facebook.png',
  '/tiktok.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ARCHIVOS).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
