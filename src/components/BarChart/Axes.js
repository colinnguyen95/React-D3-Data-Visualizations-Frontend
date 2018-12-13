import React from 'react'
import Axis from './Axis'

const Axes = ({ scales, innerWidth, innerHeight }) => {

  const yProps = {
    orient: 'Right',
    scale: scales.yScale,
    //tickSize: innerWidth,
  }

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${innerHeight})`,
    //tickSize: innerHeight,
  }

  return (
    // <g transform={`translate(${margins.left}, ${margins.top})`}>
    <g>
      <Axis {...yProps} />
      <Axis {...xProps} />
    </g>
  )
}

export default Axes;