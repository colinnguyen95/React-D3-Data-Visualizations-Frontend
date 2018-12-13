import React, { Component } from 'react'
//import './Axis.css'

class Range extends Component {
  render() {
    return (
        <div style={{display: 'flex'}}>
            {/* <p>Choose a year: </p> */}
            <span className="range-span">
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill="#e58c72"/>
                </svg>
                <span className="padding-left-5">2014</span>
            </span>
            <span className="range-span">
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill="#8f8f8f"/>
                </svg>
                <span className="padding-left-5">2015</span>
            </span>
            <span className="range-span">
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill="#8f8f8f"/>
                </svg>
                <span className="padding-left-5">2016</span>
            </span>
            <span className="range-span">
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill="#8f8f8f"/>
                </svg>
                <span className="padding-left-5">2017</span>
            </span>
        </div>
    )
  }
}

export default Range;