import CONFIG from "./config";

console.log("[Service Worker] Config is", CONFIG);

const cacheName = CONFIG.date;
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
  "bundle.css",
  "bundle.js",
  "components.css",
  "index.html",
  "manifest.webmanifest",
  "style.css",
  "theme.css",
];

async function addToCache() {
  console.log("[Service Worker] Caching app.");
  const cache = await caches.open(cacheName);
  await cache.addAll(contentToCache);
}

async function retrieve({ request }) {
  console.log("[Service Worker] Fetching resource: " + request.url);
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
  const keys = (await caches.keys()).filter((key) => key !== cacheName);
  return Promise.all(keys.map((key) => caches.delete(key)));
}

function register() {
  if (CONFIG.production) {
    console.log("[Service Worker] Register Listener: install");
    self.addEventListener("install", addToCache);

    console.log("[Service Worker] Register Listener: fetch");
    self.addEventListener("fetch", (e) => {
      e.respondWith(retrieve(e));
    });

    console.log("[Service Worker] Register Listener: activate");
    self.addEventListener("activate", (e) => {
      e.waitUntil(clearCaches);
    });
  }
}

register();
