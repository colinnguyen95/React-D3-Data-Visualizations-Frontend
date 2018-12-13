import React, { Component } from 'react';
import PieX from './PieX'
//import Dimensions from 'react-dimensions'
//import Slice from './Slice'
//import * as d3 from 'd3';

//const data = [1,2,3,4];

class PieChartX extends Component {
    constructor(props) {
      super(props)
      this.state = {
          //isLoading: true,
          data: [],
      }; 
    }
  
    componentDidMount(){
      fetch('http://localhost:5000/profitpersegment')
        .then(response => response.json())
        .then(data => this.setState({ data: data }))
        .catch(error => console.log('parsing failed', error));
    }
    render(){
        const { data } = this.state;
        const height = 400;
        const width = 500;
        // let width = window.innerWidth;
        // let height = window.innerHeight;
        let minViewportSize = Math.min(width, height);
        // This sets the radius of the pie chart to fit within
        // the current window size, with some additional padding
        let radius = (minViewportSize * .9) / 2;
        // Centers the pie chart
        let x = width / 2;
        let y = height / 2;

        //let pieData = data.map( d => d.Profit)
        //let labelData = data.map( d => d.Segment)
        //console.log(labelData)


        return (
            <svg height={height} width={width}>
                {/* We'll create this component in a minute */}
                <PieX 
                    x={x} 
                    y={y} 
                    radius={radius} 
                    data={data} 
                    innerRadius={radius * .35}
                    outerRadius={radius}
                    cornerRadius={7}
                    padAngle={.02}
                />
            </svg>
        );
    }
}

export default PieChartX;