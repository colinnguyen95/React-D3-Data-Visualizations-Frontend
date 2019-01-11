import React, { Component } from 'react';
import * as d3 from "d3";
//import ReactDOM from "react-dom";
import * as d3Axis from 'd3-axis'
//import { select as d3Select } from 'd3-selection'
//export * from 'd3-axis';
//import Range from './Range'
//import './Axis.css'

class Axis extends Component {
    componentDidMount() {
        this.renderAxis()
    }

    componentDidUpdate() {
        this.renderAxis()
    }
    
    renderAxis() {
        const node = this.node;
        const axisType = `axis${this.props.orient}`
        const axis = d3Axis[axisType]()
          .scale(this.props.scale)
            //.orient(this.props.orient)
            .ticks(this.props.ticks);
 
        if(this.props.tickFormat!=null && this.props.axisType==='x')
            axis.tickFormat(d3.timeFormat(this.props.tickFormat));
 
        //d3Select(this.axisElement).call(axis)
        //const node = ReactDOM.findDOMNode(this);
        d3.select(node).call(axis);
    }

    render() {
        const translate = "translate(0,"+(this.props.h)+")";
 
        return (
            <g 
                className={this.props.className} 
                //ref={(el) => { this.axisElement = el; }} 
                transform={this.props.axisType==='x'?translate:""}
                ref={node => this.node = node} 
            >
            </g>
        );
    }
}

export default Axis;