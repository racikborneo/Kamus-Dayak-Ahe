const CACHE_NAME = "nelsen-v" + new Date().getTime(); // versi unik setiap update

// Install: cache semua file
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(URLS_TO_CACHE))
        .then(() => self.skipWaiting()) // langsung aktifkan SW baru
    );
});

// Activate: hapus cache lama
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        ).then(() => self.clients.claim()) // kontrol semua tab sekarang
    );
});

// Fetch: network first, fallback cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // update cache dengan versi terbaru
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
