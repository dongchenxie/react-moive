import React, { useState, useEffect } from "react";
import { fetchApp } from "./fetch";
import { Star, StarWithInteraction } from "./star";
import { MoiveComponent } from "./moiveComponent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
export const MoivePage = props => {
  //setcontext("12")
  const [movieData, setMoiveData] = useState(null);
  const [stroageData, setStroageData] = useState(null);
  let { id } = useParams();


  useEffect(() => {
    console.log("user effect");
    fetchApp(intiPage, "/movie/" + id);
  }, []);

  const intiPage = (movieDbData) => {
    // localStorage.clear()
    let localStorageData = localStorage.getItem(movieDbData.id)
    if (!localStorageData) {
      let intiData = { liked: false, score: NaN }
      let intiDataJson = JSON.stringify(intiData)
      localStorage.setItem(movieDbData.id, intiDataJson)
      setStroageData(intiData)
    } else {
      let intiData = JSON.parse(localStorageData)
      setStroageData(intiData)
    }

    setMoiveData(movieDbData)
  }
  const setScore = (s) => {
    let newStroageData = { liked: stroageData.liked, score: s }
    localStorage.setItem(movieData.id, JSON.stringify(newStroageData))
    setStroageData(newStroageData)
  }
  const toggleLike = () => {
    let newStroageData = { liked: !stroageData.liked, score: stroageData.score }
    localStorage.setItem(movieData.id, JSON.stringify(newStroageData))
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
              <div class="tooltip"><i className={" small material-icons tooltipped"} onClick={toggleLike} data-position="bottom" data-tooltip="I am a tooltip">{stroageData.liked ? "bookmark" : "bookmark_border"}</i>
                <span class="tooltiptext">{stroageData.liked ? "Remove from Favorite" : "Add to Favorite"}</span>
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
              <h5 className=" header">{stroageData.score? "Your rating is: " + stroageData.score+" stars" : "Rate this moive:"}</h5>
            </div>
           
            <StarWithInteraction
            className="stars amber-text text-darken-1"
              score={stroageData.score ?stroageData.score:0}
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
