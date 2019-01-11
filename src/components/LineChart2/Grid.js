import React, { Component } from 'react';
import * as d3 from "d3";
import * as shape from 'd3-shape';
//import Grid from './Grid';
//import Axis from './Axis';
//import ToolTip from './ToolTip';
//import Dots from './Dot';

class Grid extends Component {
    // propTypes: {
    //     h:React.PropTypes.number,
    //     grid:React.PropTypes.func,
    //     gridType:React.PropTypes.oneOf(['x','y'])
    // }

    componentDidUpdate = () => { this.renderGrid(); }
    componentDidMount = () => { this.renderGrid(); }
    renderGrid = () => {
        //var node = ReactDOM.findDOMNode(this);
        //d3.select(node).call(this.props.grid);
        const node = this.node;
        d3.select(node).call(this.props.grid);

    }
    render() {
        var translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className="y-grid" transform={this.props.gridType=='x'?translate:""} ref={node => this.node = node}>
            </g>
        );
    }

};

export default Grid