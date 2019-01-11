import React, { Component } from 'react';
//import moment from 'moment';
import * as d3 from "d3";
//import * as shape from 'd3-shape';
import Grid from '../Grid';
import Axis from '../Axis';
import ToolTip from './ToolTip';
import Dots from './Dots';
import Defs from './Defs';

class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 500,
            height: 300,
            chartId: 'v1_chart',
            tooltip:{ display:false,data:{key:'',value:''}},
            interpolations:'linear',
            margin:{
                top: 5, right: 5, bottom: 5, left: 5
            },
            yMaxBuffer:10
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

    createChart = () => {
        this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
        this.h = this.state.height - (this.props.margin.top + this.props.margin.bottom);

        this.xScale = d3.scaleTime()
            .domain(d3.extent(this.props.data, d => d[this.props.xData]))
            .rangeRound([0, this.w]);

        this.yScale = d3.scaleLinear()
            .domain([0,d3.max(this.props.data, d => d[this.props.yData]+this.props.yMaxBuffer)])
            .range([this.h, 0]);

        this.area = d3.area()
            .x( d => this.xScale(d[this.props.xData]))
            .y0(this.h)
            .y1(d => this.yScale(d[this.props.yData]))
            //.interpolate(this.props.interpolations);

        this.line = d3.line()
            .x(d => this.xScale(d[this.props.xData]))
            .y(d => this.yScale(d[this.props.yData]))
            //.interpolate(this.props.interpolations);

        this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
    }

    createElements = (element,i) => {
        var object;
        switch(element.type){
            case 'dots':
                object=(<Dots x={this.xScale} y={this.yScale} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}
                    {...this.props} {...element.props} key={i}/>);
                break;

            case 'tooltip':
                object=<ToolTip tooltip={this.state.tooltip} key={i} {...this.props} {...element.props}/>;
                break;

            case 'xGrid':
                object=<Grid h={this.h} len={this.h} scale={this.xScale} gridType="x" key={i} {...this.props} {...element.props}/>;
                break;

            case 'yGrid':
                object=<Grid h={this.h} len={this.w} scale={this.yScale} gridType="y" key={i} {...this.props} {...element.props}/>;
                break;

            case 'xAxis':
                object=<Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
                break;

            case 'yAxis':
                object=<Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
                break;

            case 'area':
                object=<path className={element.props.className} d={this.area(this.props.data)} key={i} fill={element.props.fill}/>;
                break;
            case 'path':
                object=<path className={element.props.className} d={this.line(this.props.data)} strokeLinecap={element.props.strokeLinecap} key={i}/>;
                break;

        }
        return object;
    }

    createDefs = (element,i) => {
        var object;
        switch(element.type){
            case 'gradient':
                object=(<Defs id={element.props.id} color1={element.props.color1} color2={element.props.color2}/>);
                break;
        }
        return object;
    }

    render() {
        this.createChart();

        var elements;
        var defs;

        if(this.props.children!=null) {
            if (Array.isArray(this.props.children)) {
                elements=this.props.children.map((element,i) => {
                    if(element.type!=="defs")
                        return this.createElements(element,i)
                });

                for(var i=0;i<this.props.children.length;++i){
                    if(this.props.children[i].type==="defs"){

                        var config=this.props.children[i].props.children;
                        if(config!==null){
                            if(Array.isArray(config)){
                                defs=config.map(function(elem,i){
                                    return this.createDefs(elem,i)
                                });
                            }else{
                                defs=this.createDefs(config,0);
                            }
                        }

                    }
                }
            }else{
                elements=this.createElements(this.props.children,0)
            }
        }

        return (
            <div>
                <svg id={this.state.id} width={this.state.width} height={this.state.height}>
                    {defs}
                    <g transform={this.transform}>
                        {elements}
                    </g>
                </svg>
            </div>
        );
    }
};

export default LineChart