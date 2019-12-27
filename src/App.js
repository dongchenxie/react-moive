import React, { useState, useEffect } from 'react';
import reactLogo from './logo/logo512.png'
import materializeLogo from './logo/materialize-seeklogo.com.svg'
import sassLogo from "./logo/sass-1.svg"
import { Home } from './pages/home';
import { Test } from './apiTest'
import { Rated } from './pages/rated';
import { Favorite } from './pages/favorite';
import { MoivePage } from './pages/moivePage'
import { Discover } from './pages/discover'
import { Search } from "./pages/search"
import { About } from "./pages/about"
import { SearchComponent } from './component/searchComponent'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
function App() {
  const [context, setContext] = useState("gfg");
  useEffect(() => {

    var elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
    var elems1 = document.querySelectorAll('.dropdown-trigger');
    let instances1 = M.Dropdown.init(elems1);
    let localData=localStorage.getItem("movieInfo")
    if(!localData){
      localStorage.setItem("movieInfo","{}")
    }
  }, []);
  return (
    <Router>

      <main>
        <nav className="grey darken-4">

          <div className="nav-wrapper container grey darken-4 ">
            <SearchComponent className="right hide-on-med-and-down" minimize={true} id="nav-search" />
            <a href="#!" className="brand-logo logo-layout"><a className="logo-font">&nbsp;M</a><a className="logo-text">The Movie App</a></a>

            <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/discover">Discover</Link></li>
              <li><Link to="/rated">Rated Pages</Link></li>
              <li><Link to="/favorite">Favorite</Link></li>
              <li><Link to="/about">About</Link></li>
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

          <li><Link to="/">Home</Link></li>
          <li><Link to="/discover">Discover</Link></li>
          <li><Link to="/rated">Rated Pages</Link></li>
          <li><Link to="/favorite">Favorite</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><SearchComponent minimize={true} id="sidenav-search" /></li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Redirect to="/home?name=popular" />
          </Route>

          <Route path="/home">
            <Home />
          </Route>
          <Route path="/movie/:id">
            <MoivePage />
          </Route>
          <Route forceRefresh={true} path="/rated">
            <Rated />
          </Route>
          <Route forceRefresh={true} path="/favorite">
            <Favorite />
          </Route >
          <Route forceRefresh={true} path="/discover">
            <Discover />
          </Route >
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route forceRefresh={true} path="/:id" children={<Child />} />
        </Switch>
      </main>
      <footer className=" grey darken-4 page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">The Movie App</h5>
              <p className="white-text">Powered by:</p>
              <div className="row">
                <div className="col l2 s3">
                <a href="https://www.themoviedb.org/" ><img herf="https://www.themoviedb.org/" src="https://www.themoviedb.org/assets/2/v4/logos/stacked-green-cae7a95e2590dbdde28284ac26245cb2792788838f5c498b892e8d01c183e6f3.svg"></img></a>
                </div>
                <div className="col l2 s3">
                  <a href="https://reactjs.org/" ><img herf="https://reactjs.org/" style={{width:"100%"}}src={reactLogo} alt={reactLogo}></img></a>
                </div>
                <div className="col l2 s3 img-frame">
                  <a  href="https://materializecss.com/"><img  style={{width:"110%"}} src={materializeLogo} alt={materializeLogo}></img></a>
                </div>
                <div className="col l2 s3 img-frame">
                  <a  href="https://sass-lang.com/"><img  style={{width:"100%"}} src={sassLogo } alt={sassLogo }></img></a>
                </div>
              </div>


            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><Link className="grey-text text-lighten-3" to="/">Home</Link></li>
                <li><Link className="grey-text text-lighten-3" to="/discover">Discover</Link></li>
                <li><Link className="grey-text text-lighten-3" to="/rated">Rated Pages</Link></li>
                <li><Link className="grey-text text-lighten-3" to="/favorite">Favorite</Link></li>
                <li><Link className="grey-text text-lighten-3" to="/about">About</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright grey darken-3 ">
          <div className="container">
           <a className="center-align grey-text text-lighten-3"> © 2019 Dongchen Xie</a> 
           
          
          </div>
        </div>
      </footer>

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
