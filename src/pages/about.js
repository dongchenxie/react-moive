import React, { useState } from 'react';

export const About = (props) => {

    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <div className="col offset-s3 s6">
                        <h3 className="header black-text">This is a movie app that using data from TMDb API.</h3>
                        <h6 className="header  green-text text-accent-3">This product uses the TMDb API but is not endorsed or certified by TMDb.</h6>
                    </div>

                </div>

            </div>
            <div className="section">
                <div className="row">
                    <div className=" col offset-s4 s4">
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"></img>
                    </div>
                </div>  
            </div>
        </div>)

}