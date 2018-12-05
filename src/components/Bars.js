import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

class Bars extends Component {
//   constructor(props) {
//     super(props);

//   }

  render() {
    const colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      //.range(['#F3E5F5', '#7B1FA2'])
      .range(['#7B1FA2'])
      .interpolate(interpolateLab)
    //console.log(this.props.maxValue)
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum["Product Name"]}
          x={xScale(datum["Product Name"])}
          y={yScale(datum.Profit)}
          height={height - margins.bottom - scales.yScale(datum.Profit)}
          width={xScale.bandwidth()}
          fill={colorScale(datum.Profit)}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}

export default Bars;