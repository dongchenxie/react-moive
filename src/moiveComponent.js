import React, { useState, useLayoutEffect } from 'react';
import { Star } from './star'
import "./moive-component.scss"
import TextTruncate from 'react-text-truncate'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
export const MoiveComponent = (props) => {
    //setcontext("12")
    // const [width, height] = useWindowSize();
    const [width, height] = useWindowSize()
    //screen resize function
    const [imageStyle,setImageStyle]=useState(null);
    let imgStyle = {
      
        position: 'relative',
        width: '100%',
        // paddingTop: '56.25%',
        paddingTop: '56.25%',
        // background: `-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.5))), url(${"https://image.tmdb.org/t/p/w500/" + props.moiveData.poster_path}),url(https://via.placeholder.com/360x640.png?text=POSTER+NOT+PROVIDEED)`,
        // background: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 85%, rgba(0, 0, 0, 0.9) 100%) , url(${"https://image.tmdb.org/t/p/w500/" + props.moiveData.poster_path}),url(https://via.placeholder.com/360x640.png?text=POSTER+NOT+PROVIDEED)`,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 85%, rgba(0, 0, 0, 0.9) 100%) , url(${"https://image.tmdb.org/t/p/w500/" + props.moiveData.poster_path}),url(https://via.placeholder.com/360x640.png?text=POSTER+NOT+PROVIDEED)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'

      
    }
 
    const cardStyle={
        height:"100%"
    }
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);

        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    function ShowWindowDimensions(props) {

        return <span>Window size: {width} x {height}</span>;
    }
    return (

        <div className="card horizontal">
            {/* <div  className="card-image">
                <img src={"https://image.tmdb.org/t/p/w500/" + props.moiveData.poster_path} />
                <img  style={imgStyle}/>

            </div> */}
            <div className="card-reveal">
                <span className="card-title">Overview:</span>
                <p className="">{props.moiveData.overview}</p>

            </div>
            <div className="card-stacked movie-poster" style={imgStyle} >
                <div className="card-content ">
                    <TextTruncate class="card-title white-text" line={1} element="span" truncateText="…" text={props.moiveData.title}  ></TextTruncate>
                </div>
            </div>
            <div className="card-stacked ">

                <div className="card-content ">

                    <div className="date blue-grey-text">Release Date: {props.moiveData.release_date}</div>

                    <div className="review "> <Star maxStars={5} maxScore={10} score={props.moiveData.vote_average} ></Star><span>({props.moiveData.vote_average})</span></div>
                    <span className=""><b>Overview:</b><br/></span>
                    <TextTruncate line={width > 1200 ? Math.round((width - 900)) / 100 : Math.round((width + 450)) / 300} element="span" truncateText="…" text={props.moiveData.overview} className=".overview" textTruncateChild={<a className="activator" >[read more]</a>}></TextTruncate>
                </div>
                <div class="card-action">
                   
                    <Link to={"/moive/"+props.moiveData.id}>Details</Link>
                </div>

            </div>
            {/* <div className="card-action">
                <a href="#">This is a link</a>
            </div> */}

        </div>
    )
} 
