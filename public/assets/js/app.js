if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
  
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              if (confirm("Une nouvelle version de l'application est disponible. Voulez-vous recharger ?")) {
                window.location.reload();
              }
            }
          }
        };
      };
  
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data === 'newVersionAvailable') {
        if (confirm("Une nouvelle version de l'application est disponible. Voulez-vous recharger ?")) {
          window.location.reload();
        }
      }
    });
  }
  
  



