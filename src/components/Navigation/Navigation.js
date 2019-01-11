import React from 'react';
import './Navigation.css';
import MainRangeSelection from '../MainRangeSelection'

const Navigation = ({ onRouteChange, isSignedIn, name }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'space-between', background: '#6D7993'}}>
          <p className='f2 white pa3'>{`Hello, ${name}`}</p>
          <div>
            <p className='f1 white pa3'>Team NoIdea's Data Dashboard</p>
            {/* <MainRangeSelection /> */}
          </div>
          <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav className="navHeader">
          <p className='OfficeSolutions'>Welcome to our Data Dashboard</p>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
          </div>
        </nav>
      );
    }
}

export default Navigation;