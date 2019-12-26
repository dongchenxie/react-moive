import React, { useState, useEffect } from 'react';
import { fetchToList } from '../component/fetch'
import { MovieComponent } from "../component/movieComponent"
import {SearchComponent} from '../component/searchComponent'
export const Rated = (props) => {
    const [movieData, setmovieData] = useState({ count: 0, results: [] });
    const [isLoaded, setIsLoaded] = useState(false)
    const [moviesCount, setMoviesCount] = useState(null)
    const count = (obj) => {
        const storageData = obj
        var count = 0;
        for (let i in storageData) {
            if (storageData[i].score) {

                count++;
            }
        }
        //console.log("count is: "+count)
        return count;
    }
    useEffect(() => {

        const storageData = JSON.parse(localStorage["movieInfo"])
        const totalMovies = count(storageData)
        //console.log(storageData)
        for (let i in storageData) {
            if (storageData[i].score) {

                fetchToList(setmovieData, setIsLoaded, movieData, totalMovies, "/movie/" + storageData[i].id)
            }
        }

    }, [])


    return <div className="container">
        {/* <div>{JSON.stringify(moviesData)}</div> */}
        <div >
            <h1 className="header"><div className="vl"> {"Rated movies "}</div></h1>
        </div>

        {isLoaded ? (
            <div className="row flex">

                {movieData.results.map((v, i) => {
                    if (i < 12) {
                        return <div key={i} className={"col s12 xl6  "}><MovieComponent movieData={v} /> </div>
                    }
                    return null
                })}

            </div>
        ) : (
                <div>
                    <div className="section"><h3 className="sub-header">Oops, no movies found, you can try to search here!</h3></div>
                    <SearchComponent id="autocomplete-bar" />
                </div>
            )
        }
    </div>

} 
