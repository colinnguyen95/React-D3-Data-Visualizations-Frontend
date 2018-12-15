import React, { Component } from 'react'
import Range from './Range'
import Panel from './Panel'
import PanelHeader from './PanelHeader'
import PieChartX from './PieChart/PieChartX'
import LineChart from './LineChart'
//import './Axis.css'

class SubContainer extends Component {
  render() {
    return (
        <div className="row" style={{display: 'flex'}}>
            <div className="col-md-6 custom_padding" >
                <Panel style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <PanelHeader title="Profit Per Segment">
                        <Range/>
                    </PanelHeader>
                    <PieChartX />
                </Panel>
            </div>
            <div className="col-md-6 custom_padding" >
                <Panel style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0}}>
                    <PanelHeader title="Sales by Month">
                        <Range/>
                    </PanelHeader>
                    <LineChart />
                </Panel>
            </div>
        </div>
    )
  }
}

export default SubContainer;