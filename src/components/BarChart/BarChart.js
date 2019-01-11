import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Bars from './Bars'
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper'

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: [],
    }; 
  }

  componentDidMount(){
    fetch('http://localhost:5000/top5')
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .catch(error => console.log('parsing failed', error));
  }

  render() {
    const xValue = d => d.Profit
    const yValue = d => d["Product Name"]

    const { data } = this.state;
    const margins = { top: 20, right: 50, bottom: 50, left: 50 }
    const svgDimensions = {
        width: Math.max(this.props.parentWidth, 500),
        height: 320
    }

    const innerWidth = svgDimensions.width - margins.left - margins.right
    const innerHeight = svgDimensions.height - margins.top - margins.bottom

    const maxValue = Math.max(...data.map(xValue))
    
    // scaleBand type
    const yScale = scaleBand()
      .padding(0.3)
      // scaleBand domain should be an array of specific values
      // in our case, we want to use movie titles
      .domain(data.map(yValue))
      .range([0, innerHeight])
  
     // scaleLinear type
    const xScale = scaleLinear()     
      .domain([0, maxValue])
      .range([0, innerWidth])

    console.log(xScale.domain())

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <g transform={`translate(${margins.left}, ${margins.top})`}> 
          <Bars
            //style={{zIndex: '-1'}}
            scales={{ yScale, xScale }}
            margins={margins}
            data={data}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
          <Axes
            //style={{zIndex: '100'}}
            scales={{ yScale, xScale }}
            margins={margins}
            svgDimensions={svgDimensions}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    )
  }
}

export default ResponsiveWrapper(BarChart);