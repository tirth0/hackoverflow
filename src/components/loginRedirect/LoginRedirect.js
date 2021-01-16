import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";

import classes from './LoginRedirect.module.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const backendUrl = `https://gentle-peak-83550.herokuapp.com`;

const LoginRedirect = (props) => {
  
  const location = useLocation();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
      
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${backendUrl}/auth/${params.providerName}/callback${location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        setTimeout(() => history.push('/Home'), 2000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        console.log(location.search);
        // setText('An error occurred, please see the developer console.')
      });
  }, [history, location.search, params.providerName]);

  return (
    <div className={classes.loadContainer}>
        <CircularProgress/>
    </div>
  );
};

export default LoginRedirect;
