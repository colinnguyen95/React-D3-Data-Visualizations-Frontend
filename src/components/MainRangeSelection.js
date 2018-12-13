import React, { Component } from 'react'
import Range from './Range'
//import './Axis.css'

class MainRangeSelection extends Component {
  render() {
    return (
        <div className="row range-custom">
            <div className="range-custom-child">
                <Range />
            </div>
        </div>
    )
  }
}

export default MainRangeSelection;