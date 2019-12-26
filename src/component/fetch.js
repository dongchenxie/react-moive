
const API_KEY = '?api_key=ba3201ac9a041be9433523f10fdebb05&language=en-US';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchApp = async (callback, url, query) => {
    //console.log("fetch")
    fetch(BASE_URL + url + API_KEY + query)
        .then(response => response.json())
        .then(data => {

            callback(data)

            // Prints result from `response.json()` in getRequest
        })
        .catch(error => error)
    // //console.log("loading api")
    // const result = await axios(
    //     BASE_URL + query + API_KEY,
    // );
    // callback(result);
}
export const fetchAppInit = async (callback, query) => {
    //console.log("fetch")
    let promise = await fetch(BASE_URL + query + API_KEY)
        .catch(error => error)
    let v = await promise;
    return v

}
export const fetchToList = async (callback, isLoadedCallBack, list, count, query) => {
    fetch(BASE_URL + query + API_KEY)
        .then(response => response.json())
        .then(data => {
            //console.log(BASE_URL + query + API_KEY)
            list.count = list.count + 1
            list.results.push(data)
            callback(list)
            if (list.count == count) {
                isLoadedCallBack(true)
            } else {
                //console.log((count - list.count) + " togo")
            }

        })
        .catch(error => error)
}
export const fetchMoive = (callback, id) => {

}