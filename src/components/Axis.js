import React, { Component } from 'react'
//import Range from './Range'
//import './Axis.css'

class Axis extends Component {
    componentDidMount() {
        this.renderAxis()
    }

    componentDidUpdate() {
        this.renderAxis()
    }
    
    renderAxis = () => {
       this.axis = d3.axis()
            .scale(this.props.scale)
            .orient(this.props.orient)
            .ticks(this.props.ticks);
 
        if(this.props.tickFormat!=null && this.props.axisType==='x')
            this.axis.tickFormat(d3.time.format(this.props.tickFormat));
 
        const node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.axis);
    }

    render() {
        const translate = "translate(0,"+(this.props.h)+")";
 
        return (
            <g className={this.props.className} transform={this.props.axisType=='x'?translate:""} >
            </g>
        );
    }
}

export default Axis;