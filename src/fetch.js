import axios from 'axios';
const API_KEY = '?api_key=ba3201ac9a041be9433523f10fdebb05&language=en-US';
const BASE_URL = 'https://api.themoviedb.org/3';

const GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
    + API_KEY
    + '&language=en-US';
export const fetchApp = async (callback, query,callback2) => {
    console.log("fetch")
    fetch(BASE_URL+query+API_KEY)
        .then(response => response.json())
        .then(data => {
            console.log(BASE_URL+query+API_KEY)
            callback(data)
           
           // Prints result from `response.json()` in getRequest
        })
    .catch(error => error)
    // console.log("loading api")
    // const result = await axios(
    //     BASE_URL + query + API_KEY,
    // );
    // callback(result);
}
export  const fetchAppInit = async (callback, query) => {
    console.log("fetch")
    let promise= await fetch(BASE_URL+query+API_KEY)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(BASE_URL+query+API_KEY)
            
           
        //    // Prints result from `response.json()` in getRequest
        // })
    .catch(error => error)
    let v =await promise;
    console.log("aaaaaaaaaaaaaaaaaa") 
    
    return v
   
}
export const fetchMoive = (callback, id) => {

}