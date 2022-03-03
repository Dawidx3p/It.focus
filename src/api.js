export const getTasks = async() => {
    if (typeof caches === 'undefined') return false;
    const data = await (await caches.open('tasks')).match('tasks');
    const response = await data.json();
    return response;
}

export const addDataIntoCache = async(cacheName, data) => {
    const myData = new Response(JSON.stringify(data));
  
    if ('caches' in window) {
      // Opening given cache and putting our data into it
      caches.open(cacheName).then((cache) => {
        cache.put(cacheName, myData);
      });
    }
};

export const getVacations = async() => {
  if (typeof caches === 'undefined') return false;
  const data = await (await caches.open('vacations')).match('vacations');
  const response = await data.json();
  return response;
}