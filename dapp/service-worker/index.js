import CONFIG from "./config";

console.log(
  "[Service Worker] Version:",
  CONFIG.version,
  "Build date:",
  new Date(CONFIG.date)
);

const cacheName = CONFIG.version + "." + CONFIG.date;
const contentToCache = [
  "fonts/material-icons.woff2",
  "images/icons/ios-share.png",
  "images/logo-152.png",
  "images/logo-167.png",
  "images/logo-180.png",
  "images/logo-192.png",
  "images/logo-512.png",
  "images/shortcut-time-tracking-192.png",
  "images/splash-1125.png",
  "images/splash-1242.png",
  "images/splash-1536.png",
  "images/splash-1668.png",
  "images/splash-2048.png",
  "images/splash-2048.png",
  "images/splash-640.png",
  "images/splash-750.png",
  "bundle.js",
  "components.css",
  "./",
  "manifest.webmanifest",
  "style.css",
];

function addToCache() {
  console.log(`[Service Worker ${cacheName}] Caching app`);
  return caches.open(cacheName).then((cache) =>
    Promise.all(
      contentToCache.map((url) =>
        fetch(`${url}?${CONFIG.date}`).then((response) => {
          if (!response.ok) {
            console.error(`[Service Worker ${cacheName}] Cannot fetch`, url);
            throw Error(`Cannot fetch ${url}`);
          }
          return cache.put(url, response);
        })
      )
    )
  );
}

async function retrieve({ request }) {
  let response = await caches.match(request);
  if (!response) {
    console.log(`[Service Worker ${cacheName}] Fetch miss`, request.url);
    response = await fetch(request);
    // Don't cache responses for now.
    // const cache = await caches.open(cacheName);
    // console.log("[Service Worker] Caching new resource: " + request.url);
    // cache.put(request, response.clone());
  } else {
    console.log(`[Service Worker ${cacheName}] Fetch hit`, request.url);
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
    self.addEventListener("install", (e) => {
      e.waitUntil(addToCache());
    });

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
      console.log("[Service Worker] Message:", event);
      if (event.data.action === "skipWaiting") {
        self.skipWaiting();
      }
    });
  }
}

register();
