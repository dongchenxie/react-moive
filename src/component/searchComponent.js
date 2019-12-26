import React, { useState, useEffect } from 'react';
import { fetchApp } from '../component/fetch'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
export function SearchComponent(props) {
    let instances = null
    const [query, setQuery] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [optionList, setOptionList] = useState(null)
    const handleKeyUp = (e) => {

    }
    const search = (query) => {
        fetchApp(setSearchResults, "/search/movie", "&query=" + query)
    }
    useEffect(() => {
        let elems = document.querySelectorAll('.autocomplete');
        instances = M.Autocomplete.init(elems, { limit: props.limit?props.limit:4 });
    }, [])
    useEffect(() => {
        if (searchResults && searchResults.results) {
            let options = {}
            searchResults.results.forEach((e) => {
                options[e.title] = null
            })
            setOptionList(options)
            
            if (props.id) {
                let elem = document.querySelector('#' + props.id);
                var instance = M.Autocomplete.getInstance(elem);
                instance.updateData(options)
            }
            
          
        }

    }, [searchResults])
    if (!props.minimize) {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <form action="/search" className="">
                                <div className="input-field">
                                    <input id={props.id} autocomplete="off" name="query" type="search" placeholder required onKeyUp={(e) => { search(e.target.value) }} className="autocomplete" />
                                    <label classnames="label-icon" htmlFor={props.id}><i className="material-icons">search</i></label>
                                    <i className="material-icons">close</i>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <form action="/search" className={props.className}>
                <div className="input-field">
                    <input id={props.id} autocomplete="off" name="query" type="search" placeholder required onKeyUp={(e) => { search(e.target.value) }} className="autocomplete" />
                    <label classnames="label-icon" htmlFor={props.id}><i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                </div>
            </form>
        )
    }
}