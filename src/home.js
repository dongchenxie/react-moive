import React, { useState, useEffect } from 'react';
import { fetchApp} from './fetch';
import { MoiveComponent } from './moiveComponent';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation
} from "react-router-dom";
export  const Home = (props) => {
    //setcontext("12")
    const [moviesData, setMoiveData] = useState(null);
    let query1 = useQuery();

    let id = query1.get("name")
    const [query, setQuery] = useState(id)


    const vaildParams = ["popular", "top_rated", "now_playing", "upcoming"]
    const pageTitle = { "popular": "Popular", "top_rated": "Top Rated", "now_playing": "Now Playing", "upcoming": "Upcoming" }
    let result = vaildParams.find(e => e == id);
    result = result ? result : "popular"
    // fetchApp(setMoiveData, "/movie/" + id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => {
        console.log("fetchApp")
        fetchApp(setMoiveData, "/movie/" + id)
    }, []);

    const reFetch = async(e) => {
        id = e
        fetchApp(setMoiveData, "/movie/" + id)
        // let result=await fetchAppInit(setMoiveData, "/movie/" + id)
        console.log(result)

    }
    // fetchApp(setMoiveData, "/movie/" + result)

    // 
    return <div>
        {/* <Child name={query1.get("name")} /> */}
        <div className=" grey darken-3">
            <ul className="tabs tabs-transparent">
                {
                    vaildParams.map((e, i) => {
                        // return (<li className="tab" ><a onClick={() => { reFetch(e) }} href={"/home?name=" + e}>{pageTitle[e]}</a></li>)
                        return (<li className="tab" ><Link onClick={() => { reFetch(e) }} to={"/home?name=" + e}>{pageTitle[e]}</Link></li>)
                    })
                }

            </ul>

        </div>
        <div className="container">
            {/* <div>{JSON.stringify(moviesData)}</div> */}
            <div >
                <h1 className="header"><div className="vl"> {pageTitle[id] + " Moives "}</div>

                </h1>

            </div>

            {moviesData ? (
                <div className="row flex">

                    {moviesData.results.map((v, i) => {
                        if (i < 12) {
                            return <div key={i} className="col s12 xl6  "><MoiveComponent moiveData={v} /> </div>
                        }
                        return null
                    })}

                </div>
            ) : (
                    <div>could not load {id}</div>
                )
            }
        </div>
    </div>
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Child({ name }) {
    return (
        <div>
            {name ? (
                <h3>
                    The <code>name</code> in the query string is &quot;{name}
                    &quot;
          </h3>
            ) : (
                    <h3>There is no name in the query string</h3>
                )}
        </div>
    );
}
// export class Home extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { moiveData: null, query: "popular",count:1 }
//        this.setMoiveData=this.setMoiveData.bind(this)
//         fetchApp(this.setMoiveData, "/movie/" + this.state.query)
//         console.log(this.state.moiveData)
//     }
//     setMoiveData(data) {
//         console.log(data)
//         this.setState({ moiveData: data ,count: this.state.count+1})
//         console.log("new moive data"+this.state.moiveData)
//     }
//     componentDidMount() {


//     }
//     render() {
//         // let { id } = useParams();
//         const vaildParams = ["popular", "top_rated", "now_playing", "upcoming"]
//         const pageTitle = { "popular": "Popular", "top_rated": "Top Rated", "now_playing": "Now Playing", "upcoming": "Upcoming" }
//         if(this.state.moiveData){
//             return <div>
//             <div className=" grey darken-3">
//                 <ul className="tabs tabs-transparent">
//                     {
//                         vaildParams.map((e, i) => {
//                             return (<li className="tab" ><a onClick={() => { this.setMoiveData(e) }} to={"/home/" + e}>{pageTitle[e]}</a></li>)
//                         })
//                     }

//                 </ul>

//             </div>
//             <div className="container">
//                 <div >
//                     <h1 className="header"><div className="vl"> {pageTitle["popular"] + " Moives"}</div>

//                     </h1>
//                 </div>


//                     <div className="row flex">

//                         {this.state.moviesData.results.map((v, i) => {
//                             if (i < 12) {
//                                 return <div className="col s12 xl6  "><MoiveComponent moiveData={v} /> </div>
//                             }
//                             return null
//                         })}

//                     </div>

//             </div>
//         </div>
//         }else{
//         return <div>Nothing{this.state.count}</div>
//         }

//     }
// }
