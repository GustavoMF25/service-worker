const cacheName = 'v2';

//Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worked instalado!!')
})

// Call Active Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated')
    // remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Woorker: Limpando a cache antiga')
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

// Call Fetch event

self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching...')
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone()
                // Open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // add response to cache
                        cache.put(e.request, resClone);
                    })
                return res;
            }).catch(err => caches.match(e.request).then(res => res))
    )
})