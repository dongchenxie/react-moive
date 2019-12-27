import React, { useState, useEffect } from 'react';
import { fetchApp } from '../component/fetch';
import { MovieComponent } from '../component/movieComponent';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation
} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
export const Home = (props) => {
    //setcontext("12")
    const [moviesData, setmovieData] = useState(null);
    let query1 = useQuery();

    let id = query1.get("name")
    const [query, setQuery] = useState(id)


    const vaildParams = ["popular", "top_rated", "now_playing", "upcoming"]
    const pageTitle = { "popular": "Popular", "top_rated": "Top Rated", "now_playing": "Now Playing", "upcoming": "Upcoming" }
    let result = vaildParams.find(e => e == id);
    result = result ? result : "popular"

    useEffect(() => {
        //console.log("fetchApp")
        fetchApp(setmovieData, "/movie/" + id)
    }, []);

    const reFetch = async (e) => {
        id = e
        fetchApp(setmovieData, "/movie/" + id)
        //console.log(result)
    }

    return <div>
        <div className=" grey darken-3">
            <div className="container">
                <ul className="tabs tabs-transparent">
                    {
                        vaildParams.map((e, i) => {

                            return (<li className="tab" ><Link onClick={() => { reFetch(e) }} to={"/home?name=" + e}>{pageTitle[e]}</Link></li>)
                        })
                    }

                </ul></div>
        </div>
        <div className="container">
            <div >
                <h1 className="header"><div className="vl"> {pageTitle[id] + " movies "}</div>
                </h1>
            </div>
            {moviesData ? (
                <div className="row flex">

                    {moviesData.results.map((v, i) => {
                        if (i < 12) {
                            return <div key={i} className="col s12 xl6  "><MovieComponent movieData={v} /> </div>
                        }
                        return null
                    })}

                </div>
            ) : (
                    <div>loading... {id}</div>
                )
            }
        </div>
    </div>
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
