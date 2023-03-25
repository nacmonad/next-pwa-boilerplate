import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

export const MainContext = createContext({
    state:{
        count:0
    },
    stateFunctions:{
        setCount: (c)=>{},
        handleInc: ()=>{},
        handleDec: ()=>{},
    }
});

export const MainContextProvider = ( {children} ) => {

    const [sw, setSw] = useState(null);
    const [count, setCount] = useState(0)
    const [isOnline, setIsOnline] = useState(false);
      function handleInc() {
        fetch(`/api/count`, {
          method: "POST",
          headers:{
            "content-type":"application/json"
          },
          body: JSON.stringify({
            type: "inc"
          })
        })
        .then(r=>r.json())
        .then(r=>{
            console.log("[res]", r)
            setCount(r.count)

        })
        .catch(console.log)
      }
      function handleDec() {
        fetch(`/api/count`, {
          method: "POST",
          headers:{
            "content-type":"application/json"
          },
          body: JSON.stringify({
            type: "dec"
          })
        })
        .then(r=>r.json())
        .then(r=>{
            console.log("[res]", r)
            setCount(r.count)
        })
        .catch(console.log)
      }

      const value = {
        state: {
            count,
            isOnline
        },
        stateFunctions:{
            setCount,
            handleInc,
            handleDec,
        }
    }
    useEffect(()=>{
        console.log("[MainCtxInit]");
        if(typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.ready
                .then(registration => {
                console.log('Service Worker is ready:', registration);
                const serviceWorker = registration.active;
                
                
                navigator.serviceWorker.addEventListener('message', event => {
                    console.log("[MainCtxMessageRx]:", event.data);
                    switch(event.data.type) {
                        case "COUNT_RESPONSE":
                            setCount(event.data.data.count);
                            break;
                        default:
                            console.log("[UnhandledMessageType]")
                            break;
                    }



                  });

                window.addEventListener('online', (event) => {
                    //navigator.serviceWorker.controller.postMessage({ type: 'GET_CONTEXT' });
                    navigator.serviceWorker.controller.postMessage({ type: 'online' });
                    
                    });
                    
                window.addEventListener('offline', (event) => {
                    navigator.serviceWorker.controller.postMessage({ type: 'offline' });

                    });

                })
                .catch(error => {
                console.error('Error registering Service Worker:', error);
                
                });
                
                //getInitialContext
                //navigator.serviceWorker.controller.postMessage({ type: 'GET_CONTEXT' });

            } else {
            console.log('Service Worker is not supported.');
            
            }
              

    }, [])
    return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

export const useMainContext = () => useContext(MainContext);