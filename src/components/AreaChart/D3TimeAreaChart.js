import React, { Component } from 'react';
//import moment from 'moment';
import * as d3 from "d3";
//import * as shape from 'd3-shape';
import Grid from '../Grid';
import Axis from '../Axis';

class D3TimeAreaChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //data: [],
            width: 500,
            height: 300,
            chartId: 'v1_chart',
            margin:{
                top: 5, right: 5, bottom: 5, left: 5
            },
            yMaxBuffer:10,
        }; 
      }

      //mixins:[resizeMixin]

    //shouldComponentUpdate() { return false }
    

    createChart = () => {

        this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
        this.h = this.state.height - (this.props.margin.top + this.props.margin.bottom);
        //this.h = 800;

        this.xScale = d3.scaleTime()
            .domain(d3.extent(this.props.data, d => d[this.props.xData]))
            .rangeRound([0, this.w]);

        this.yScale = d3.scaleLinear()
            .domain([0,d3.max(this.props.data, d => d[this.props.yData]+this.props.yMaxBuffer)])
            .range([this.h, 0]);

        this.area = d3
            .area()
            .x(d => this.xScale(d[this.props.xData]))
            .y0(this.h)
            .y1(d => this.yScale(d[this.props.yData]))
            .curve(this.props.interpolations)

        this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
    }

    createElements = (element,i) => {
        var object;

        switch(element.type){

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

                var data=[];
                //console.log(data);

                for(var k=0,j=0;k<this.props.data.length;++k){
                    if(this.props.data[k][this.props.type]===element.props.value){
                        data[j]=this.props.data[k];
                        ++j;
                    }
                    //console.log(data)
                }
                object=<path className={element.props.className} d={this.area(data)} key={i} fill={element.props.fill}/>;
                break;
        }
        return object;
    }
    render(){
        this.createChart();
        let elements;

        if(this.props.children!=null) {
            if (Array.isArray(this.props.children)) {
                elements=this.props.children.map((element,i) => this.createElements(element,i));
            }else{
                elements=this.createElements(this.props.children,0)
            }
        }

        console.log(elements)

        return (
            <div>
                <svg 
                    id={this.state.chartId} 
                    width={this.state.width} 
                    height={this.state.height} 
                >
                    <g transform={this.transform}>
                        {elements}
                    </g>
                </svg>
            </div>
        );
    }
}

export default D3TimeAreaChart
//window.D3TimeAreaChart=D3TimeAreaChart;