import React, { Component } from 'react';
import Range from './Range';
import Panel from './Panel';
import PanelHeader from './PanelHeader';
import LineChart from './LineChart/LineChart';
//import Chart from './BarChart/Chart'
import D3TimeAreaChart from './AreaChart/D3TimeAreaChart';
import * as d3 from "d3";
import moment from 'moment';
//import './Axis.css'

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultLine:false,
            defaultArea:false,
            dataLine:true,
            dataArea:true
        }; 
      }

    componentWillMount = () => {
        this.loadLineChart();
        this.loadAreaChart();
        eventEmitter.addListener("reload",this.reloadData);
    } 

    componentWillUnmount = () => {
        eventEmitter.removeListener("reload",this.reloadData);
    }
    
    reloadData = (defaultValue) => {
        this.loadLineChart(defaultValue);
        this.loadAreaChart(defaultValue);
    }

    loadLineChart = (defaultValue) => {

        let count=7;

        if(!defaultValue){
            count=30;
        }

        let parseDate = d3.timeParse("%m-%d-%Y");
        let data=[];
        for(let i=0;i<count;++i){

            let d={day:moment().subtract(i, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 80) + 50)};
            d.date = parseDate(d.day);
            data[i]=d;
        }
        //console.log(data[1])
        this.setState({dataLine:data,defaultLine:defaultValue});
    }

    loadAreaChart = (defaultValue) => {

        let count=7;
        if(!defaultValue){
            count=30;
        }

        let parseDate = d3.timeParse("%m-%d-%Y");
        let dataArea=[
            // {
            // "day": "04-06-2016", "count": 13, "type": "A", "date": "2016-04-06T04:00:00.000Z"
            // },
            // {
            // "day": "04-05-2016", "count": 14, "type": "A", "date": "2016-04-05T04:00:00.000Z"
            // },
            // {
            // "day": "04-06-2016", "count": 40, "type": "B", "date": "2016-04-06T04:00:00.000Z"
            // },
            // {
            // "day": "04-05-2016", "count": 54, "type": "B", "date": "2016-04-05T04:00:00.000Z"
            // },
            // {
            // "day": "04-06-2016", "count": 70, "type": "C", "date": "2016-04-06T04:00:00.000Z"
            // },
            // {
            // "day": "04-05-2016", "count": 79, "type": "C","date": "2016-04-05T04:00:00.000Z"
            // }
        ];

        for(let i=0,j=0;i<count;++i,++j){

            let d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 30) + 5),type:'A'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(let i=count,j=0;i<count*2;++i,++j){

            let d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 40) + 20),type:'B'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(let i=count*2,j=0;i<count*3;++i,++j){

            let d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 50) + 30),type:'C'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
            //console.log(d.date)
        }

        this.setState({dataArea:dataArea,defaultArea:defaultValue});
    }

  render() {
    let margin={
        top: 20, right: 30, bottom: 20, left: 50
    };

    return (
        <div className="row">
            <div className="col-md-6 custom_padding" >
                <Panel>
                    <PanelHeader title="Category Analysis">
                        <Range loadData={this.loadAreaChart} defaultSelection={this.state.defaultArea}/>
                    </PanelHeader>
                    {/* <Chart /> */}

                     <D3TimeAreaChart data={this.state.dataArea} xData="date" yData="count" type="type" margin={margin}
                                        yMaxBuffer={10} id="multi-area-chart" interpolations={d3.curveCardinal}>
                        <yGrid orient="Left" className="y-grid" ticks={5}/>
                        <xAxis orient="Bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                        <yAxis orient="Left" className="axis" ticks={5}/>
                        <area className="area" fill="#ca6f96" value="C"/>
                        <area className="area" fill="#53c79f" value="B"/>
                        <area className="area" fill="#e58c72" value="A"/>

                    </D3TimeAreaChart>
                </Panel>
                
            </div>
            <div className="col-md-6 custom_padding" >
                <Panel>
                    <PanelHeader title="Sales by Month">
                    <Range loadData={this.loadLineChart} defaultSelection={this.state.defaultLine}/>
                    </PanelHeader>
                    <LineChart data={this.state.dataLine} xData="date" yData="count" margin={margin}
                                        yMaxBuffer={10} id="line-chart">
                        <defs>
                            <gradient color1="#fff" color2="#53c79f" id="area"/>
                        </defs>
                        {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
                        <yGrid orient="Left" className="y-grid" ticks={5}/>
                        <xAxis orient="Bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                        <yAxis orient="Left" className="axis" ticks={5}/>
                        <area className="area" fill="url(#area)"/>
                        <path className="line shadow" strokeLinecap="round"/>
                        <dots r="5" format="%b %e" removeFirstAndLast={false}/>
                        <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count"/>
                    </LineChart>
                </Panel>
            </div>
        </div>
    )
  }
}

export default MainContainer;