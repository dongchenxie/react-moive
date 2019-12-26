import React, { useState, useEffect } from 'react';
import { fetchApp } from '../component/fetch'
import {SearchComponent} from '../component/searchComponent'
import { MovieComponent } from "../component/movieComponent"
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
export const Discover = (props) => {
    const [movieData, setmovieData] = useState(null);
    const [param, setParam] = useState("")
    const [sortBy,setSortBy]=useState(null)
    const [genres, setGenres] = useState(null)
    const url="/discover/movie"
    const YEAR_START = 1920
    const YEAREND = (new Date().getFullYear())
    const sortMethods=[
        {value:"popularity.desc",display:"Popularity"}, 
        {value:"vote_average.asc",display:"Review Ascending"}, 
        {value:"vote_average.desc",display:"Review Descending"},
        {value:"primary_release_date.asc", display:"Release Date Ascending"},
        {value:"primary_release_date.desc", display:"Release Date Descending"},
        {value:"original_title.asc", display:"Title Ascending"},
        {value:"original_title.desc",display:"Title Descending"}
    ]
    const SORTLIST=()=>{
        let items=[]
        sortMethods.forEach((e)=>{
            items.push(<option key={e.value} value={e.value}>{e.display}</option>)
        })
        return items
    }
    const YEARLIST = () => {
        let items = []
        for (let i = YEAR_START; i < YEAREND + 5; i++) {
            items.push(<option key={i} value={i} selected={i == YEAREND ? true : false}>{i}</option>)
        }
        return items
    }
    const GENRELIST = () => {
        //console.log(genres)
        let items = []
        genres.forEach((e) => {
            items.push(<option value={e.id}>{e.name}</option>)
        })
        let elems5 = document.querySelectorAll('.select-multi');
        let instances5 = M.FormSelect.init(elems5, { isMultiple: true });
        return items
    }
    const count = (obj) => {
        const storageData = obj
        var count = 0;
        for (let i in storageData) {
            if (storageData[i].liked) {

                count++;
            }
        }
        //console.log("count is: " + count)
        return count;
    }
    //store genres
    const storeGenres = (obj) => {
        setGenres(obj.genres)
    }
    useEffect(() => {
        fetchApp(storeGenres, "/genre/movie/list")
    }, [])
    //initialize materialize-css
    useEffect(() => {
        let elems4 = document.querySelectorAll('.select-single');
        let instances4 = M.FormSelect.init(elems4);

    }, [genres])
    //fetch default movie data
    useEffect(() => {

        //console.log("fetchApp")
        fetchApp(setmovieData, "/movie/popular")

    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        let query = ""
        query += "&primary_release_year=" + event.target.year.value
        query += "&sort_by="+event.target.sort.value
        query += "&with_genres="
        //console.log(event.target.genre.options[0])
        let options = event.target.genre.options
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                query += options[i].value + ","
            }
        }
        setParam(query)
        fetchApp(setmovieData, url, query)
    }
   

    if (genres) {
        return <div className="container">
            {/* <div>{JSON.stringify(moviesData)}</div> */}

            <div >
                <h1 className="header"><div className="vl"> {"Discover movies "}</div></h1>
            </div>

            <div className="section">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field year-list col s12 xl3">
                            <select name="year" className="select-single">
                                {YEARLIST()}
                            </select>
                            <label>Year</label>
                        </div>

                        <div className="input-field genre-list col s12 xl7">
                            <select name="genre" className="select-multi" multiple>
                                {GENRELIST()}
                            </select>
                            <label>Genre</label>
                        </div>
                        <div className="input-field year-list col s12 xl2">
                            <select name="sort" className="select-single">
                                {SORTLIST()}
                            </select>
                            <label>Sort By</label>
                        </div>
                        
                       
                        <div className="input-field  col offset-s8 offset-xl10   s4  xl2">
                            <button type="submit" value="Submit" style={{width:"100%"}} class="btn amber waves-effect waves-light"  >
                                <i class="material-icons">search</i>
                            </button>
                        </div>

                    </div>
                </form>

            </div>
            {movieData&&movieData.results.length>0 ? (
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
    } else {
        return <div></div>
    }


} 
