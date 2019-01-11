import React, { Component } from 'react';
//import moment from 'moment';
import * as d3 from "d3";
//import * as shape from 'd3-shape';
//import Grid from '../Grid';
//import Axis from '../Axis';

class Path extends Component {
    componentWillMount = () => {
        var radius=this.props.height;
        var outerRadius=radius/2;
        var innerRadius=radius/this.props.innerRadiusRatio;

        this.arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        this.transform='translate('+radius/2+','+radius/2+')';

    }
    createChart = () => {
        var paths = (this.props.pie(this.props.data)).map((d, i) => <path fill={this.props.color(i)} d={this.arc(d)} key={i}/>);
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

export default Path