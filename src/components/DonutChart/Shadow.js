import React, { Component } from 'react';
//import moment from 'moment';
import * as d3 from "d3";
import * as shape from 'd3-shape';
//import Grid from '../Grid';
//import Axis from '../Axis';

class Shadow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shadowSize:10
        }; 
      }

    componentWillMount = () => {
        var radius=this.props.height;
        var outerRadius=radius/this.props.innerRadiusRatio+1;
        var innerRadius=outerRadius-this.state.shadowSize;

        this.arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        this.transform='translate('+radius/2+','+radius/2+')';
    }
    createChart = () => {
        var paths = (this.props.pie(this.props.data)).map((d, i) => {
            var c = d3.hsl(this.props.color(i));
            c = d3.hsl((c.h+5), (c.s -.07), (c.l -.10));

            return (
                <path fill={c} d={this.arc(d)} key={i}/>
            )
        });
        return paths;
    }

    render() {
        var paths = this.createChart();

        return(
            <g transform={this.transform}>
                {paths}
            </g>
        )
    }
};

export default Shadow