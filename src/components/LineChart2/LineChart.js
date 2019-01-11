import React, { Component } from 'react';
//import moment from 'moment';
import * as d3 from "d3";
//import * as shape from 'd3-shape';
import Grid from './Grid';
import Axis from './Axis';
import ToolTip from './ToolTip';
import Dots from './Dots';

class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 500,
            height: 300,
            chartId: 'v1_chart',
            tooltip:{ display:false,data:{key:'',value:''}},
        }; 
      }

    showToolTip = (e) => {
        e.target.setAttribute('fill', '#FFFFFF');

        this.setState({tooltip:{
            display:true,
            data: {
                key:e.target.getAttribute('data-key'),
                value:e.target.getAttribute('data-value')
                },
            pos:{
                x:e.target.getAttribute('cx'),
                y:e.target.getAttribute('cy')
            }

            }
        });
    }

    hideToolTip = (e) => {
        e.target.setAttribute('fill', '#7dc7f4');
        this.setState({tooltip:{ display:false,data:{key:'',value:''}}});
    }

    render() {
        var data=[
            {day:'02-11-2016',count:180},
            {day:'02-12-2016',count:250},
            {day:'02-13-2016',count:150},
            {day:'02-14-2016',count:496},
            {day:'02-15-2016',count:140},
            {day:'02-16-2016',count:380},
            {day:'02-17-2016',count:100},
            {day:'02-18-2016',count:150}
        ];

        var margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.state.height - (margin.top + margin.bottom);

        var parseDate = d3.timeParse("%m-%d-%Y");

        data.forEach(function (d) {
            d.date = parseDate(d.day);
            console.log(d.date)
            console.log(d.day)
        });

        
        var x = d3.scaleTime()
            .domain(d3.extent(data, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);

        var y = d3.scaleLinear()
            .domain([0,d3.max(data,function(d){
                return d.count+100;
            })])
            .range([h, 0]);

        var yAxis = d3.axisLeft()
            .scale(y)
            //.orient('left')
            .ticks(5);

        var xAxis = d3.axisBottom()
            .scale(x)
            //.orient('bottom')
            .tickValues(data.map(function(d,i){
                if(i>0)
                    return d.date;
            }).splice(1))
            .ticks(4);

        var xGrid = d3.axisBottom()
            .scale(x)
            //.orient('bottom')
            .ticks(5)
            .tickSize(-h, 0, 0)
            .tickFormat("");

        var yGrid = d3.axisLeft()
            .scale(y)
            //.orient('left')
            .ticks(5)
            .tickSize(-w, 0, 0)
            .tickFormat("");

        // var interpolations = [
        //     "linear",
        //     "step-before",
        //     "step-after",
        //     "basis",
        //     "basis-closed",
        //     "cardinal",
        //     "cardinal-closed"];

        var line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            }).curve(d3.curveCardinal);


        var transform='translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div>
                <svg id={this.state.chartId} width={this.state.width} height={this.state.height}>
                    <g transform={transform}>
                        <Grid h={h} grid={yGrid} gridType="y"/>
                        <Grid h={h} grid={xGrid} gridType="x"/>
                        <Axis h={h} axis={yAxis} axisType="y" />
                        <Axis h={h} axis={xAxis} axisType="x"/>
                        <path className="line shadow" d={line(data)} strokeLinecap="round"/>
                        <Dots data={data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>
                        <ToolTip tooltip={this.state.tooltip}/>
                    </g>
                </svg>
            </div>
        );
    }
};

export default LineChart