import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
//import Chart from './components/BarChart/Chart';
//import PieChart from './components/PieChart'
//import PieChartX from './components/PieChart/PieChartX'
//import LineChart from './components/LineChart'
import MainRangeSelection from './components/MainRangeSelection'
import SubContainer from './components/SubContainer'
import Cards from './components/Cards'
import Tables from './components/Tables'
import MainContainer from './components/MainContainer'
import Register from './components/Register/Register';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      // imageUrl: '',
      // box: {},
      route: 'signin',
      //route: 'signin',
      isSignedIn: false,
      user: {
        //id: '',
        name: '',
        //email: '',
        //joined: ''
      }
    }
  }

  loadUser = (user) => {
    this.setState({user: {
      //id: data.id,
      name: user.name,
      //email: data.email,
      //entries: data.entries,
      //joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
         {/* <Particles className='particles'
          params={particlesOptions}
        /> */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} name={this.state.user.name}/>
        { route === 'home'
          ? <div className="home-page" style={{background: '#343434'}}>
              <div className="container">
                <MainRangeSelection />
                <Cards />
                <MainContainer />
                <SubContainer />
              </div>
              {/* <div className="compContainer">
                <Chart />
                
              </div> */}
              {/* <div className="compContainer">
                <PieChartX />
                <LineChart />
              </div> */}
            </div>
          : <div className="landing-page">
            <Particles className='particles'
              params={particlesOptions}
            />
            {
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            }
            </div>
        }
        <Tables />
      </div>
    );
  }
}

export default App;
