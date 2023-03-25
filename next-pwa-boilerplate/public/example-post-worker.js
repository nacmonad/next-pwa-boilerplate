// serviceWorker.js
let offlinePostQueue = [];

self.addEventListener("fetch", (event) => {
  if (event.request.method === "POST") {
    if (!navigator.onLine) {
      // If the user is offline, add the POST request to the queue
      event.respondWith(addToQueue(event.request.clone()));
    } else {
      // If the user is online, handle the POST request as usual
      event.respondWith(fetch(event.request.clone()));
    }
  }
});

async function addToQueue(request) {
  offlinePostQueue.push(request);
  return new Response("Request added to queue", {
    status: 202,
    statusText: "Accepted",
  });
}

self.addEventListener("sync", (event) => {
  if (event.tag === "send-offline-posts") {
    event.waitUntil(sendOfflinePosts());
  }
});

async function sendOfflinePosts() {
  while (offlinePostQueue.length > 0) {
    const request = offlinePostQueue.shift();
    try {
      const response = await fetch(request);
      // Handle the response from the server here
    } catch (error) {
      console.error("Error sending offline post:", error);
      // Add the request back to the queue if it failed
      offlinePostQueue.unshift(request);
      break;
    }
  }
}

// App.js
navigator.serviceWorker.ready.then((registration) => {
  // Register a background sync task that runs every time the user goes online
  return registration.sync.register("send-offline-posts");
});
