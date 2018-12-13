import React, { Component } from 'react'
//import Range from './Range'
//import './Axis.css'

class Panel extends Component {
  render() {
    return (
        <div className="bg">
            {this.props.children}
        </div>
    )
  }
}

export default Panel;