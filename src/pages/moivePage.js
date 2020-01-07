import React, { useState, useEffect } from "react";
import { fetchApp } from "../component/fetch";
import { Star, StarWithInteraction } from "../component/star";
import { MoiveComponent } from "../component/movieComponent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import M from 'materialize-css'
export const MoivePage = props => {
  //setcontext("12")
  const [movieData, setMoiveData] = useState(null);
  const [stroageData, setStroageData] = useState(null);
  let { id } = useParams();


  useEffect(() => {
    //console.log("user effect");
    fetchApp(intiPage, "/movie/" + id);
  }, []);

  const intiPage = (movieDbData) => {

    let localStorageData = localStorage.getItem("movieInfo")
    if (!localStorageData) {//the case that movieInfo does not exists
      let initObject = {}
      let intiData = { id: movieDbData.id, liked: false, score: NaN }
      initObject[movieDbData.id] = intiData
      let intiDataJson = JSON.stringify(initObject)
      localStorage.setItem("movieInfo", intiDataJson)
      setStroageData(intiData)
    } else {
      let storageData = JSON.parse(localStorageData)
      if (storageData[movieDbData.id]) {//the case this movie data has found
        setStroageData(storageData[movieDbData.id])
      } else {
        let initObject = storageData
        let intiData = { id: movieDbData.id, liked: false, score: NaN }
        initObject[movieDbData.id] = intiData
        let intiDataJson = JSON.stringify(initObject)
        localStorage.setItem("movieInfo", intiDataJson)
        setStroageData(intiData)
      }

    }

    setMoiveData(movieDbData)
    let elems3 = document.querySelectorAll('.tooltipped');
    let instances3 = M.Tooltip.init(elems3);
  }
  const setScore = (s) => {
    let localStorageData = localStorage.getItem("movieInfo")
    let wholeStorageData = JSON.parse(localStorageData)
    let newStroageData = { id: movieData.id, liked: stroageData.liked, score: s }
    wholeStorageData[movieData.id] = newStroageData
    localStorage.setItem("movieInfo", JSON.stringify(wholeStorageData))
    setStroageData(newStroageData)
  }
  const toggleLike = () => {
    let localStorageData = localStorage.getItem("movieInfo")
    let wholeStorageData = JSON.parse(localStorageData)
    let newStroageData = { id: movieData.id, liked: !stroageData.liked, score: stroageData.score }
    wholeStorageData[movieData.id] = newStroageData
    localStorage.setItem("movieInfo", JSON.stringify(wholeStorageData))
    setStroageData(newStroageData)
  }

  if (movieData) {
    return (
      <div className="container">

        <div className="movie-content row">
          <div className="movie-poster col offset-s2 s8 xl5">
            <img
              src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path}
              style={{ height: "auto", width: "100%" }}
            ></img>
          </div>
          <div className="movie-content col s12 offset-xl1 xl6">
            <h1 className="header vl-no-margin-left">{movieData.title}</h1>
            <div className={stroageData.liked ? "blue-text" : "grey-text"}>
              <div class="tooltip"><i className={" small material-icons tooltipped"} onClick={toggleLike} data-position="bottom" data-tooltip={stroageData.liked ? "Remove from Favorite" : "Add to Favorite"}>{stroageData.liked ? "bookmark" : "bookmark_border"}</i>
                {/* <span class="tooltiptext"></span> */}
              </div>
            </div>
            <div className="section">
              <p>{"Release Date: " + movieData.release_date}</p>
              <div className="review-section">
                <h5 className=" header">{movieData.vote_average}</h5>
                <div className="stars-in-moive-page">
                  <Star
                    maxStars={5}
                    maxScore={10}
                    score={movieData.vote_average}
                  ></Star>
                </div>

              </div>
            </div>
            <div className="">{movieData.overview}</div>
            <div className="section">
              <h5 className=" header">{stroageData.score ? "Your rating is: " + stroageData.score + " stars" : "Rate this moive:"}</h5>
            </div>

            <StarWithInteraction
              className="stars amber-text text-darken-1"
              score={stroageData.score ? stroageData.score : 0}
              callback={setScore}
              maxStars={5}
              maxScore={10} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="progress">
        <div className="determinate" style={{ width: "70%" }}></div>
      </div>
    );
  }
};
