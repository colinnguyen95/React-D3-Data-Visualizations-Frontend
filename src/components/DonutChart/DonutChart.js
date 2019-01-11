import React, { Component } from 'react';
//import moment from 'moment';
import * as d3 from "d3";
import Shadow from './Shadow';
import Path from './Path';
import Legend from './Legend';
//import * as shape from 'd3-shape';
//import Grid from '../Grid';
//import Axis from '../Axis';

class DonutChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 500,
            height: 250,
            padAngle:0,
            //color:[],
            innerRadiusRatio:3.3
        }; 
      }

    // componentWillMount = () => {
    //     this.pie = d3.pie()
    //         .value( d => d[this.props.point])
    //         .padAngle(this.state.padAngle)
    //         .sort(null);

    //     this.color = d3.scaleOrdinal()
    //         //.range(this.props.color);
    //         .range(['#68c8d7','#eccd63','#bb8cdd','#de6942','#52b36e','#bbc7d9']);

    //     //this.setState({width:this.state.width});
    // }

    render() {

        const pie = d3.pie()
            .value( d => d[this.props.point])
            .padAngle(this.state.padAngle)
            .sort(null);

        const color = d3.scaleOrdinal()
            //.range(this.props.color);
            .range(['#68c8d7','#eccd63','#bb8cdd','#de6942','#52b36e','#bbc7d9']);

        // console.log(this.props.color)
        // console.log(this.color)
        var shadow;
        if(this.props.enable3d){
            shadow=(
                <Shadow 
                    width={this.state.width} 
                    height={this.state.height} 
                    innerRadiusRatio={this.state.innerRadiusRatio}
                    pie={pie} 
                    color={color} 
                    data={this.props.data} 
                    shadowSize={this.props.shadowSize}
                />  
            );
        }

        var legend;

        if(this.props.children!=null){
            if(!Array.isArray(this.props.children)){
                if(this.props.children.type==='legend'){
                    legend=(
                        <Legend 
                            pie={pie} 
                            color={color} 
                            data={this.props.data}
                            width={this.state.width} 
                            height={this.state.height}
                            label={this.props.label} 
                            radius={this.props.children.props.radius}
                        />
                    );
                }
            }
        }

        return (
            <div>
                <svg id={this.props.id} width={this.state.width}
                     height={this.state.height}
                >
                    {shadow}
                    <Path 
                        width={this.state.width} 
                        height={this.state.height} 
                        innerRadiusRatio={this.state.innerRadiusRatio}
                        pie={pie} 
                        color={color} 
                        data={this.props.data}
                    />
                    {legend}
                </svg>
            </div>
        );
    }
};

export default DonutChart
