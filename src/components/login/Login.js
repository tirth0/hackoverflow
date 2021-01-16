import React from 'react';
import {Button} from '@material-ui/core';
import classes from './Login.module.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';


const LoginButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[500]),
      width : '15rem',
      margin : '1rem',
      textDecoration : 'none',
      backgroundColor: blue[500],
      '&:hover': {
        backgroundColor: blue[700],
      },
    },
  }))(Button);

const Icon = ({provider}) =>{
    let IconComponent;
    if (provider === 'facebook')
        IconComponent = <FacebookIcon/>
    else if (provider === 'github')
        IconComponent = <GitHubIcon/>
    else if (provider === 'google')
        IconComponent = <GTranslateIcon/>
    else if (provider === 'twitter')
        IconComponent = <TwitterIcon/>
    return (
        IconComponent
    );
}


const SocialLink = ({provider}) => {
    return(
    <a href={`https://gentle-peak-83550.herokuapp.com/connect/${provider}`} className={classes.link}>
      <LoginButton type="button" social={provider}>
        <Icon provider={provider}/>
        &nbsp;
        {provider}
      </LoginButton>
    </a>);
}

const AuthBtns = () =>{
    const providers = ['facebook', 'github', 'google', 'twitter'];
    return(
        <div className={classes.loginContainer}>
       {providers.map(provider => <SocialLink provider={provider} key={provider} />)}
     </div>
    );
}

export default AuthBtns;