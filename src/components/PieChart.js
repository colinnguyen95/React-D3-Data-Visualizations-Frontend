import React, { Component } from 'react';
import * as d3 from 'd3';
import Slice from './Slice'

//const data = [1,2,3,4];

class PieChart extends Component {
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
        //console.log(data)
        const height = 450;
        const width = 450;
        // let pie = d3.pie()
        //     .value( d => d.Profit)
        //     (data);
        let pie = d3.pie()(data.map( d => d.Profit ));

        return(
            <svg height={height} width={width}>
                <g transform={`translate(${width / 2}, ${height /2})`}>
                    <Slice pie={pie}/>
                </g>
            </svg>
        );
    }
}
    

export default PieChart;