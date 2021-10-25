const cacheName = 'v2';
const cacheAssets = [
    'index.html',
]


//Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worked instalado!!')

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: caching files')
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
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

self.addEventListener('fetch', (e)=>{
    console.log('Service Worker: Fetching...')
    e.respondWith(
        fetch(e.request).catch(caches =>caches.match(e.request))
    )
})