import React, { Component } from 'react';
import * as d3 from "d3";
import * as shape from 'd3-shape';
//import Grid from './Grid';
//import Axis from './Axis';
//import ToolTip from './ToolTip';
//import Dots from './Dot';

class Axis extends Component {
    // propTypes: {
    //     h:React.PropTypes.number,
    //     axis:React.PropTypes.func,
    //     axisType:React.PropTypes.oneOf(['x','y'])

    // },

    componentDidUpdate = () => { this.renderAxis(); }
    componentDidMount = () => { this.renderAxis(); }
    renderAxis = () => {
        //var node = ReactDOM.findDOMNode(this);
        //d3.select(node).call(this.props.axis);
        const node = this.node;
        d3.select(node).call(this.props.axis);

    }
    render() {

        var translate = "translate(0,"+(this.props.h)+")";

        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""} ref={node => this.node = node}>
            </g>
        );
    }

};

export default Axis