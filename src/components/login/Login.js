import React from 'react';
import {Button} from '@material-ui/core';
import classes from './Login.module.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';

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
    <a href={`http://localhost:1337/connect/${provider}`} className="link">
      <Button type="button" social={provider}>
        <Icon provider={provider}/>
        {provider}
      </Button>
    </a>);
}

const AuthBtns = () =>{
    const providers = ['facebook', 'github', 'google', 'twitter'];
    return(
        <div>
       {providers.map(provider => <SocialLink provider={provider} key={provider} />)}
     </div>
    );
}

export default AuthBtns;