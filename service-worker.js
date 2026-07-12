const CACHE_NAME = "pwa-teste-v3";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json",
    "/icons/icon-192.png",
    "/icons/icon-512.png"
];

// Instala
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});

// Ativa
self.addEventListener("activate", event => {

    event.waitUntil(

        Promise.all([

            clients.claim(),

            caches.keys().then(keys =>

                Promise.all(

                    keys

                        .filter(key => key !== CACHE_NAME)

                        .map(key => caches.delete(key))

                )

            )

        ])

    );

});

// Cache
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => response || fetch(event.request))

    );

});

// Recebe mensagens da página
self.addEventListener("message", event => {

    if (event.data && event.data.action === "skipWaiting") {

        self.skipWaiting();

    }

});