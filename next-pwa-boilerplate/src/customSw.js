// serviceWorker.js
//importScripts("workbox-sw.js");

// Add this line to set the __WB_MANIFEST variable
//if(!self.__WB_MANIFEST) self.__WB_MANIFEST = [];

const WB_MANIFEST = self.__WB_MANIFEST;

let offlinePostQueue = [];

self.addEventListener("fetch", (event) => {
  console.log("[SWFetchHandler]", event)
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

self.addEventListener('message', event => {
  try {
    if(event.data) console.log("[SWMessage]", {
      data: event.data,
    })
    if (event.data && event.data.type === 'GET_CONTEXT') {
        event.source.postMessage({type: 'CONTEXT_RESPONSE', data:offlinePostQueue });
    }
    if (event.data.type === 'offline') {
      console.log("[sw_offline]")
      //event.source.postMessage({type: 'CONTEXT_RESPONSE', data:offlinePostQueue });
  
    } 
    if (event.data.type === 'online') {
      console.log("[sw_online]")
      //event.source.postMessage({type: 'CONTEXT_RESPONSE', data:offlinePostQueue });
      sendOfflinePosts(event);
    }
  } catch(e) {
    console.log(e)
  }
});



self.addEventListener("sync", (event) => {
  console.log("[SWSYnc]")
  if (event.tag === "send-offline-posts") {
    event.waitUntil(sendOfflinePosts());
  }
});


async function addToQueue(request) {
  

  offlinePostQueue.push(request);
  console.log("[AddedToQueue]", offlinePostQueue)
  return new Response(JSON.stringify({ offlinePostQueue }),{
    status: 202,
    statusText: "Accepted",
  });
}


async function sendOfflinePosts(event) {
  while (offlinePostQueue.length > 0) {
    const request = offlinePostQueue.shift();
    try {
      const response = await fetch(request);
      const res = await response.json();
      
      event.source.postMessage({ type: "COUNT_RESPONSE", data: res })

      // Handle the response from the server here
    } catch (error) {
      console.error("Error sending offline post:", error);
      // Add the request back to the queue if it failed
      offlinePostQueue.unshift(request);
      break;
    }
  }
}


