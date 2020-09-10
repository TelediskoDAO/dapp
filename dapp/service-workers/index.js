import CONFIG from "./config";

console.log("[Service Worker] Build date", new Date(CONFIG.date));

const cacheName = new Date(CONFIG.date).toISOString().substr(0, 19);
const contentToCache = [
  "fonts/material-icons.woff2",
  "images/icons/ios-share.png",
  "images/logo-152.png",
  "images/logo-167.png",
  "images/logo-180.png",
  "images/logo-192.png",
  "images/logo-512.png",
  "images/shortcut-time-tracking-192.png",
  "images/splash-1125.jpg",
  "images/splash-1242.jpg",
  "images/splash-1536.jpg",
  "images/splash-1668.jpg",
  "images/splash-2048.jpg",
  "images/splash-2048.png",
  "images/splash-640.jpg",
  "images/splash-750.jpg",
  "bundle.js",
  "components.css",
  "index.html",
  "manifest.webmanifest",
  "style.css",
];

async function addToCache() {
  console.log(`[Service Worker ${cacheName}] Caching app`);
  const cache = await caches.open(cacheName);
  await cache.addAll(contentToCache);

  Promise.all(
    contentToCache.map((url) =>
      fetch(`${url}?${Math.random()}`).then((response) => {
        if (!response.ok) {
          console.error(`[Service Worker ${cacheName}] Cannot fetch`, url);
          throw Error(`Cannot fetch ${url}`);
        }
        return cache.put(url, response);
      })
    )
  );
}

async function retrieve({ request }) {
  console.log(`[Service Worker ${cacheName}] Fetching resource`, request.url);
  let response = await caches.match(request);
  if (!response) {
    response = await fetch(request);
    // Don't cache responses for now.
    // const cache = await caches.open(cacheName);
    // console.log("[Service Worker] Caching new resource: " + request.url);
    // cache.put(request, response.clone());
  }
  return response;
}

async function clearCaches() {
  console.log(`[Service Worker ${cacheName}] Clear cache`);
  const keys = (await caches.keys()).filter((key) => key !== cacheName);
  return Promise.all(keys.map((key) => caches.delete(key)));
}

function register() {
  if (CONFIG.production) {
    console.log(`[Service Worker ${cacheName}] Register Listener: install`);
    self.addEventListener("install", addToCache);

    console.log(`[Service Worker ${cacheName}] Register Listener: fetch`);
    self.addEventListener("fetch", (e) => {
      e.respondWith(retrieve(e));
    });

    console.log(`[Service Worker ${cacheName}] Register Listener: activate`);
    self.addEventListener("activate", (e) => {
      console.log(`[Service Worker ${cacheName}] Activate`);
      e.waitUntil(clearCaches());
    });

    self.addEventListener("message", function (event) {
      if (event.data.action === "skipWaiting") {
        self.skipWaiting();
      }
    });
  }
}

register();
