import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

class Bars extends Component {

  render() {
    const colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#C18EDA', '#7B1FA2'])
      .interpolate(interpolateLab)

    const { scales, data} = this.props
    const { xScale, yScale } = scales

    const bars = (
      data.map(datum =>
        <rect
          key={datum["Product Name"]}
          y={yScale(datum["Product Name"])}
          width={xScale(datum.Profit)}
          height={yScale.bandwidth()}
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