import React from 'react';
import classes from './App.module.css';
import Nav from '../Nav/Nav';
import MapWrapper from '../Map/Map';

const Application = () =>{
    const features = [];
    return (
        <div className={classes.fullPage}>
            <div className = {classes.Nav}><Nav/></div>
            <MapWrapper features={features}/>
        </div>
    );
}

export default Application;
