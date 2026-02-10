/* Service Worker for REmake Speedrun Guide - Offline Support */

const CACHE_NAME = 'remake-guide-v1';
const OFFLINE_URL = 'index.html';

// Files to cache for offline access
const CACHE_FILES = [
  '/',
  '/index.html',
  '/common.css',
  '/guide-common.css',
  '/common.js',
  '/remake_guide_page_1.html',
  '/remake_guide_page_2.html',
  '/remake_guide_page_3.html',
  '/remake_guide_page_4.html',
  '/remake_guide_page_5.html',
  '/remake_guide_page_6.html',
  '/remake_guide_page_7.html',
  '/remake_guide_page_8.html',
  '/remake_guide_page_9.html',
  '/remake_guide_page_10.html',
  '/remake_guide_page_11.html',
  '/remake_guide_page_12.html',
  '/remake_guide_page_13.html',
  '/remake_guide_page_14.html',
  '/remake_guide_page_15.html',
  '/remake_guide_page_16.html',
  '/resources-page.html',
  '/quick-reference-guide.html',
  '/struggler_info_page.html'
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching core files');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Removing old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (like Google Fonts)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          // Fetch in background to update cache (stale-while-revalidate)
          event.waitUntil(
            fetch(event.request)
              .then((networkResponse) => {
                if (networkResponse.ok) {
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(event.request, networkResponse));
                }
              })
              .catch(() => {})
          );
          return cachedResponse;
        }

        // Not in cache, try network
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache new resources
            if (networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed, return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
      })
  );
});
