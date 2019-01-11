import React, { Component } from 'react';
import * as d3 from "d3";
//import ReactDOM from "react-dom";
import * as d3Axis from 'd3-axis'
//import * as d3Axis from 'd3-axis'
//export * from 'd3-axis';
//import Axis from "./Axis";
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
        const node = this.node;
        const gridType = `axis${this.props.orient}`
        const grid = d3Axis[gridType]()
            .scale(this.props.scale)
            //.orient(this.props.orient)
            .ticks(this.props.ticks)
            .tickSize(-this.props.len, 0, 0)
            .tickFormat("");
 
        //const node = ReactDOM.findDOMNode(this);
        d3.select(node).call(grid);
    }

    render() {
        const translate = "translate(0,"+(this.props.h)+")";
 
        return (
            <g 
                className={this.props.className} 
                transform={this.props.gridType==='x'?translate:""} 
                //ref={(el) => { this.axisElement = el; }}
                ref={node => this.node = node}
            >
            </g>
        );
    }
}

export default Grid;