if ('serviceWorker' in navigator && window.Notification) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/javascripts/sw.js').then(registration => {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(error) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}
