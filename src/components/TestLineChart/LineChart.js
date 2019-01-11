import React from 'react';
import * as d3 from 'd3';

class LineChart extends React.Component {
    constructor(){
        super();

        this.state = {
            data: []
        };
    }

    componentDidMount(){
        fetch('http://localhost:5000/profitByMonth')
          .then(response => response.json())
          .then(data => this.setState({ data: data }))
          .catch(error => console.log('parsing failed', error));
      }

    componentDidUpdate() {
        let line = d3.selectAll("#line");
        var totalLength = line.node().getTotalLength();
        console.log(totalLength);
        line
          .attr("stroke-dasharray", totalLength)
          .attr("stroke-dashoffset", totalLength)
          .attr("stroke-width", 6)
          .attr("stroke", "#6788ad")
          .transition()
          .duration(2000)
          .attr("stroke-width", 0)
          .attr("stroke-dashoffset", 0);
    
        let area = d3.selectAll("#area");
    
        area
          .attr("transform", "translate(0, 300)")
          .transition()
          .duration(3000)
          .attr("transform", "translate(0,0)");
      }
    
      render() {
        let { data } = this.state;
    
        const height = 300;
        const width = 450;
    
        const boxStyles = {
          //background: 'pink',
          width: width,
          height: height,
          borderRadius: 5,
          //margin: "0 auto"
        };
    
        const minX = d3.min(data.map(o => o["Order Date"]));
        const maxX = d3.max(data.map(o => o["Order Date"]));
        const minY = d3.min(data.map(o => o.Sales));
        const maxY = d3.max(data.map(o => o.Sales));
    
        let x = d3
          .scaleLinear()
          .domain([minX, maxX])
          .range([0, width]);
    
        let y = d3
          .scaleLinear()
          .domain([minY, maxY])
          .range([height, height / 3]);
    
        var line = d3
          .line()
          .x(function(d) {
            return x(d["Order Date"]);
          })
          .y(function(d) {
            return y(d.Sales);
          });
    
        var area = d3
          .area()
          .x(function(d) {
            return x(d["Order Date"]);
          })
          .y0(function(d) {
            return maxY;
          })
          .y1(function(d) {
            return y(d.Sales);
          });
    
        return (
          <div style={boxStyles} style={{margin: 0}}>
            <svg height={height} width={width}>
              <defs>
                <linearGradient id="MyGradient">
                  <stop offset="-10%" stopColor="#3b83d4" />
                  <stop offset="95%" stopColor="#6788ad" />
                </linearGradient>
              </defs>
    
              <g id={"xAxis"}>
                <path
                  id={"line"}
                  d={line(data)}
                  fill={"transparent"}
                  stroke={"transparent"}
                />
                <path
                  id={"area"}
                  d={area(data)}
                  fill={"url(#MyGradient)"}
                  style={{ opacity: 0.9 }}
                />
              </g>
            </svg>
          </div>
        );
    }
}

export default LineChart;