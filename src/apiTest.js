import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchApp } from './component/fetch';
import { MoiveComponent } from './component/movieComponent';
export function Test() {
    const [data, setData] = useState({ hits: [] });
    const [moviesData, setMoiveData] = useState(null);
    const [query, setQuery] = useState("popular")
    const pageTitle = { "popular": "Popular", "top_rated": "Top Rated", "now_playing": "Now Playing", "upcoming": "Upcoming" }
    useEffect(async () => {
        fetchApp(setMoiveData, "/movie/" + query)
    }, []);
    // useEffect(()=>{fetchApp(setMoiveData, "/movie/" + query)})
    if(moviesData){
        return <div>{JSON.stringify(moviesData.data.results)}</div>
    }else{
        return <div>{JSON.stringify(moviesData)}</div>
    }
    return (
        <div>
            {JSON.stringify(moviesData.results)}
            {/* <div className="container">
            <div >
                <h1 className="header"><div className="vl"> {pageTitle[query] + " Moives"}</div>

                </h1>
            </div>

            {moviesData ? (
                <div className="row flex">

                    {moviesData.results.map((v, i) => {
                        if (i < 12) {
                            return <div className="col s12 xl6  "><MoiveComponent moiveData={v} /> </div>
                        }
                        return null
                    })}

                </div>
            ) : (
                    <div>could not load</div>
                )
            }
        </div> */}
        </div>
    );
}
