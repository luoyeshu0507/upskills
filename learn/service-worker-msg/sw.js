self.addEventListener('install', (event) => {
    console.log('sw installed');
    self.registration.showNotification('111');
});

self.addEventListener('activate', (event) => {
    console.log('sw activate');
});

self.onpush = pushEvent => {
    console.log('pushEvent', pushEvent);
}

self.onnotificationclick = event => {
    console.log('event', event);
}