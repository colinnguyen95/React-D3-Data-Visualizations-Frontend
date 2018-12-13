import React, { Component } from 'react'
//import Range from './Range'
//import './Axis.css'

class Grid extends Component {
    componentDidMount() {
        this.renderAxis()
    }

    componentDidUpdate() {
        this.renderAxis()
    }
    
    renderAxis = () => {
       this.grid = d3.axis()
            .scale(this.props.scale)
            .orient(this.props.orient)
            .ticks(this.props.ticks)
            .tickSize(-this.props.len, 0, 0)
            .tickFormat("");
 
        const node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.grid);
    }

    render() {
        const translate = "translate(0,"+(this.props.h)+")";
 
        return (
            <g className={this.props.className} transform={this.props.gridType=='x'?translate:""} >
            </g>
        );
    }
}

export default Grid;