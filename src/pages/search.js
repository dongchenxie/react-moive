import React, { useState, useEffect } from 'react';
import { fetchApp } from '../component/fetch'
import { MovieComponent } from '../component/movieComponent'
import {SearchComponent} from '../component/searchComponent'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect,
    useLocation
} from "react-router-dom";
export function Search() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    //let { id } = useParams();
    const [moviesData, setmovieData] = useState(null)
    let query1 = useQuery();
    let id = query1.get("query")
    useEffect(() => {
        fetchApp(setmovieData, "/search/movie", "&query=" + id)

    }, []);
    return (
        <div className="container">
            {/* <div>{JSON.stringify(moviesData)}</div> */}
            <div className="">
                <h1 className="header vl">{"Search Movies "}
                </h1>
                <h5 className="sub-header">{">\nDisplaying results for:  \"" + id + "\""}</h5>
            </div>
            {moviesData && moviesData.results.length > 0 ? (
                <div className="row flex">

                    {moviesData.results.map((v, i) => {
                        if (i < 12) {
                            return <div key={i} className="col s12 xl6  "><MovieComponent movieData={v} /> </div>
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


    );
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}