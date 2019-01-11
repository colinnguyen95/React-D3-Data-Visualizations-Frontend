import React, { Component } from 'react';
import * as d3 from "d3";
import * as shape from 'd3-shape';
import Grid from './Grid';
import Axis from './Axis';
import ToolTip from './ToolTip';
//import Dots from './Dot';

class Dots extends Component {

    render() {
        //var this=this;
        //remove last & first point
        var data=this.props.data.splice(1);
        data.pop();

        var circles=data.map = (d,i) => {

        return (<circle className="dot" r="7" cx={this.props.x(d.date)} cy={this.props.y(d.count)} fill="#7dc7f4"
                        stroke="#3f5175" strokeWidth="5px" key={i}
                        onMouseOver={this.props.showToolTip} onMouseOut={this.props.hideToolTip}
                        data-key={d3.timeFormat("%b %e")(d.date)} data-value={d.count}/>)
        };

        return(
            <g>
                {circles}
            </g>
        );
    }
};

export default Dots

