import React from 'react';
import classes from './Roads.module.css';
import RoadTable from './Roads';


const SideBar = ()=>{
    return(
    <div className={classes.sideBar}>
        <div className={classes.header}>
            <div className={classes.profile}></div>
            
        </div>
        <div className={classes.links}>
            <a href="/Home">Application</a>
            <a href="/">Logout</a>
        </div>
        <div className={classes.footer}>
            <p>Socials</p>
        </div>
    </div>
    );
}


const Roads = () =>{
    return (
        <div className={classes.roadPage}>
            <div className={classes.sideBarContainer}>
                <SideBar/>
            </div>
            <div className={classes.roadTableContainer}>
                <RoadTable></RoadTable>
            </div>
        </div>
    );
}

export default Roads;