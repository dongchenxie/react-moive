import React from 'react';

export const Favorite=(props)=>{
    for(var i in localStorage) {
        console.log(i + ' = ' + localStorage[i]);
    }
return <h1> Favorite{props.name}</h1>
} 
