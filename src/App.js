import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './home';
import { Test } from './apiTest'
import { Rated } from './rated';
import { Favorite } from './favorite';
import { MoivePage } from './moivePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
function App() {
  const [context, setContext] = useState("gfg");
  useEffect(() => {
    console.log("app js loaded")
  });
  return (
    <Router>
      <nav className="">
        <div className="nav-wrapper  grey darken-4 ">
          <form className="right hide-on-med-and-down">
            <div className="input-field">
              <input id="search" type="search" required />
              <label classnames="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
          <a href="#!" className="brand-logo">Logo</a>

          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/discover">Discover</Link></li>
            <li><Link to="/rated">Rated Pages</Link></li>
            <li><Link to="/favorite">Favorite</Link></li>
            <li><Link to="route" onClick={(event) => { event.preventDefault(); window.location.replace("/discover"); }} >123232</Link></li>
            <li><a className='dropdown-trigger' data-target='dropdown1'>Drop Me!</a>

              <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li className="divider" tabIndex="-1"></li>
                <li><a href="#!">three</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
              </ul></li>
          </ul>

          {/* <a className="btn-floating btn-large halfway-fab waves-effect waves-light teal">
            <i className="material-icons">add</i>
          </a> */}
          {/* <a id="menu" className="btn-floating btn-large halfway-fab waves-effect waves-light teal" ><i className="material-icons">menu</i></a>


          <div className="tap-target" data-target="menu">
            <div className="tap-target-content">
              <h5>Title</h5>
              <p>A bunch of text</p>
            </div>
          </div> */}
        </div>

      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><a to="/">Home</a></li>
        <li><a target="_self" href="/discover">Discover</a></li>
        <li><Link target="_blank" to="/rated">Rated Pages</Link></li>
        <li><Link target="_blank" to="/favorite">Favorite</Link></li>
        <li><Link to="route" target="_blank" onClick={(event) => { event.preventDefault(); window.open(this.makeHref("route")); }} >123232</Link></li>
        {/* <li><form action="/" className="" >
          <div className="input-field">
            <input id="search1" name="search" type="search" required />
            <label className="label-icon" for="search1"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form></li> */}

      </ul>

      <Switch>
        <Route exact path="/">
          <Redirect to="/home?name=popular" />
        </Route>

        <Route path="/home">
          <Home />
        </Route>


        <Route path="/moive/:id">
          <MoivePage />
        </Route>
        <Route forceRefresh={true} path="/rated">
          <Rated />
        </Route>
        <Route forceRefresh={true} path="/favorite">
          <Favorite />
        </Route >
        <Route forceRefresh={true} path="/:id" children={<Child />} />
      </Switch>

    </Router>
  );
}

export default App;
function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
