import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Bars from './Bars'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'

//import data from '../../data'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
        //isLoading: true,
        data: [],
    }; 
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  componentDidMount(){
    fetch('http://localhost:5000/top10')
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(error => console.log('parsing failed', error));
  }

  render() {
    const { data } = this.state;
    //console.log(data)
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = {
        width: Math.max(this.props.parentWidth, 500),
        height: 500
    }
    const maxValue = Math.max(...data.map(d => d.Profit))
    //console.log(maxValue)
    
    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      // scaleBand domain should be an array of specific values
      // in our case, we want to use movie titles
      .domain(data.map(d => d["Product Name"]))
      .range([margins.left, svgDimensions.width - margins.right])
  
     // scaleLinear type
    const yScale = this.yScale
       // scaleLinear domain required at least two values, min and max       
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
         <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    )
  }
}

export default ResponsiveWrapper(Chart);