import React from 'react';
import classes from './App.module.css';

import MapWrapper from '../Map/Map';

const Application = () =>{
    const features = [];
    return (
        <div className={classes.fullPage}>
            <MapWrapper features={features}/>
        </div>
    );
}

export default Application;
