import React, { Component } from 'react'
//import Range from './Range'
//import './Axis.css'

class PanelHeader extends Component {
  render() {
    return (
        <div className="panel-header" style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="pull-left panel-title">{this.props.title}</div>
            <div className="pull-right line-height-30">
                {this.props.children}
            </div>

        </div>
    )
  }
}

export default PanelHeader;