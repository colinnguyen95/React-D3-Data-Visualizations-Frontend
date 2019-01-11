import React, { Component } from 'react';
//import moment from 'moment';
import * as d3 from "d3";
import * as shape from 'd3-shape';
//import Grid from '../Grid';
//import Axis from '../Axis';

class Legend extends Component {

    createChart = () => {
        const texts = this.props.pie(this.props.data).map((d, i) => {
            var transform="translate(10,"+i*30+")";
            var rectStyle = {
                fill:this.props.color(i),
                stroke:this.props.color(i)
            };
            var textStyle = {
                fill:this.props.color(i)
            };
            return (
                <g transform={transform} key={i}>
                    <rect width="20" height="20" style={rectStyle} rx={this.props.radius} ry={this.props.radius}/>
                    <text x="30" y="15" className="browser-legend" style={textStyle}>{d.data[this.props.label]}</text>
                </g>
            )
        });
        return texts;
    }

    render() {

        var style={
            visibility:'visible'
        };

        if(this.props.width<=this.props.height+70){
            style.visibility='hidden';
        }

        var texts = this.createChart();

        var legendY=this.props.height/2-this.props.data.length*30/2;
        console.log('hello')
        console.log(this.props.data.map((d, i) => i))

        var transform="translate("+(this.props.width/2+80)+","+legendY+")";
        return(
            <g is transform={transform} style={style}>
                {texts}
            </g>
        )
    }
};

export default Legend